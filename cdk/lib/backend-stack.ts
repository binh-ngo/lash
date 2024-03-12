import {
    CfnOutput,
    Duration,
    Expiration,
    Stack,
    StackProps,
  } from "aws-cdk-lib";
  import { IUserPool } from "aws-cdk-lib/aws-cognito";
  import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
  import {
    AuthorizationType,
    FieldLogLevel,
    GraphqlApi,
    Schema,
    UserPoolDefaultAction,
  } from "@aws-cdk/aws-appsync-alpha";
  import {
    Code,
    Function as LambdaFunction,
    Runtime,
  } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
  
  interface BackendStackProps extends StackProps {
    readonly userPool: IUserPool;
  }
  
  export class BackendStack extends Stack {
    constructor(parent: Stack, id: string, props: BackendStackProps) {
      super(parent, id, props);
  
      const lashSiteTable = new Table(this, "LashSiteTable", {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "PK",
          type: AttributeType.STRING,
        },
        sortKey: {
          name: "SK",
          type: AttributeType.STRING,
        },
      });
      new CfnOutput(this, "LashSiteTableName", {
        value: lashSiteTable.tableName,
      });
  
      const lashSiteLambda = new LambdaFunction(this, "LashSiteLambda", {
        runtime: Runtime.NODEJS_18_X,
        handler: "main.handler",
        code: Code.fromAsset("lambda"),
        memorySize: 512,
        environment: {
          // Lash Table
          lash_TABLE: lashSiteTable.tableName,
        },
      });
      lashSiteTable.grantFullAccess(lashSiteLambda);

      const api = new GraphqlApi(this, "LashSiteGraphQL", {
        name: "lash-site",
        schema: Schema.fromAsset("./graphql/schema.graphql"),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: AuthorizationType.API_KEY,
            apiKeyConfig: {
              expires: Expiration.after(Duration.days(365)),
            },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: AuthorizationType.USER_POOL,
              userPoolConfig: {
                userPool: props.userPool,
                appIdClientRegex: ".*",
                defaultAction: UserPoolDefaultAction.ALLOW,
              },
            },
          ],
        },
        logConfig: {
          fieldLogLevel: FieldLogLevel.ERROR,
        },
        xrayEnabled: false,
      });
  
      // Prints out the AppSync GraphQL endpoint to the terminal
      new CfnOutput(this, "LashSiteGraphQLAPIURL", {
        value: api.graphqlUrl,
      });
  
      // Prints out the AppSync GraphQL API key to the terminal
      new CfnOutput(this, "LashSiteGraphQLAPIKey", {
        value: api.apiKey || "",
      });
  
      // Prints out the stack region to the terminal
      new CfnOutput(this, "Stack Region", {
        value: this.region,
      });

      // Define the IAM role for the AppSync DataSource
      const appSyncDataSourceRole = new Role(this, 'AppSyncDataSourceRole', {
        assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      });
  
      // Attach the necessary policy statement to the role
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['lambda:InvokeFunction'], 
        resources: [lashSiteLambda.functionArn],
      }));
      
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['dynamodb:UpdateItem'], 
        resources: [lashSiteTable.tableArn],
      }));

      const lashSiteDataSource = api.addLambdaDataSource(
        "LashSiteDataSource",
        lashSiteLambda
      );

      // Resolvers
      lashSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllProjects",
      })
      lashSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getProjectById",
      })
      lashSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createProject",
      })
      lashSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteProject",
      })
      lashSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateProject",
      })
    }
  }
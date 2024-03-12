import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";

export class CognitoStack extends Stack {
  readonly userPool: UserPool;

  constructor(parent: Stack, id: string, props?: StackProps) {
    super(parent, id, props);

    this.userPool = new UserPool(this, "LashSite-UserPool", {
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireDigits: false,
        requireUppercase: false,
        requireSymbols: false,
      },
      selfSignUpEnabled: true,
    });

    const userPoolClient = this.userPool.addClient("LashSiteAdminClient", {
      userPoolClientName: "LashSite-admin",
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
    });

    new CfnOutput(this, "LashSite-UserPoolId", { value: this.userPool.userPoolId });
    new CfnOutput(this, "LashSite-UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteMessage = async (messageId: string, appointmentId: string) => {
  console.log(
    `deleteMessage invocation event: ${JSON.stringify(`Appointment ID: ${appointmentId}, Message Id: ${messageId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK": [
        // {
        //   DeleteRequest: {
        //     Key: {
        //       PK: `MESSAGES`,
        //       SK: `MESSAGE#${messageId}`,
        //     },
        //   },
        // },
        {
          DeleteRequest: {
            Key: {
              PK: `MESSAGE#${messageId}`,
              SK: `MESSAGE#${messageId}`,
            },
          },
        },
        // {
        //   DeleteRequest: {
        //     Key: {
        //       PK: `APPOINTMENT#${appointmentId}`,
        //       SK: `MESSAGE#${messageId}`,
        //     },
        //   },
        // },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted messageId: ${messageId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteMessage;
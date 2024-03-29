const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteAppointment = async (clientName: string, appointmentId: string) => {
  console.log(
    `deleteAppointment invocation event: ${JSON.stringify(`Client Name: ${clientName}, client Id: ${appointmentId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK": [
        {
          DeleteRequest: {
            Key: {
              PK: `APPOINTMENTS`,
              SK: `APPOINTMENT#${appointmentId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `APPOINTMENT#${appointmentId}`,
              SK: `APPOINTMENT#${appointmentId}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `CLIENT#${clientName}`,
              SK: `APPOINTMENT#${appointmentId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    await docClient.batchWrite(batchWriteParams).promise();
    
    return `Deleted appointmentId: ${appointmentId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteAppointment;
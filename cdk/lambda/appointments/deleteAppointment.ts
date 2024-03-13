const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteAppointment = async (clientName: string, appointmentId: string) => {
  console.log(
    `deleteAppointment invocation event: ${JSON.stringify(`Client Name: ${clientName}, client Id: ${appointmentId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
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
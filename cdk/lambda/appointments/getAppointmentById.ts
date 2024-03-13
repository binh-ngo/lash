const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getAppointmentById = async (appointmentId: string) => {
  console.log(`getAppointmentById called with: (${appointmentId})`);

  if (!appointmentId) {
    return { statusCode: 400, body: `Error: You are missing the client ID` };
  }

  const params = {
    TableName: process.env.CONTRACTORS_TABLE,
    Key: {
      PK: `APPOINTMENT#${appointmentId}`,
      SK: `APPOINTMENT#${appointmentId}`,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  
  try {
    const data = await docClient.get(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    return data.Item;

    } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};


export default getAppointmentById;
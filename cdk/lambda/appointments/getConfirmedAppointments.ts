import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllConfirmedAppointmentsFromAllClients = async () => {
  console.log(`getAllConfirmedAppointmentsFromAllClients called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.LASH_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition", 
    FilterExpression: "#isConfirmed = :isConfirmed",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#isConfirmed": "isConfirmed",
    },
    ExpressionAttributeValues: {
      ":post_partition": `APPOINTMENTS`,
      ":isConfirmed": true,
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false,
  };

  try {
    const data = await docClient.query(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    return data.Items;
  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default getAllConfirmedAppointmentsFromAllClients;
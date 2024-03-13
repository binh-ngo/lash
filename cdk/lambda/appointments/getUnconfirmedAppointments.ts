import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getUnconfirmedAppointments = async (clientName: string) => {
  console.log(`getUnconfirmedAppointments called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.CONTRACTORS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition AND begins_with(#SK, :sk_prefix)", 
    FilterExpression: "#isConfirmed = :isConfirmed",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
      "#isConfirmed": "isConfirmed",
    },
    ExpressionAttributeValues: {
      ":post_partition": `CLIENT#${clientName}`,
      ":sk_prefix": "APPOINTMENT#",
      ":isConfirmed": false,
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

export default getUnconfirmedAppointments;
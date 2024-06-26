import { ddbQueryPostsParams } from "../types";
const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllMessages = async (appointmentId: string) => {
  console.log(`getAllMessages called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.LASH_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition and begins_with(#SK, :sk_prefix)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":post_partition": `APPOINTMENT#${appointmentId}`,
      ":sk_prefix": "MESSAGE#",
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: true, // Set this to true for ascending order
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

export default getAllMessages;

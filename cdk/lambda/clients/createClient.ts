const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Client, ClientInput } from "../types";
require("dotenv").config({ path: ".env" });

const createClient = async (clientInput: ClientInput) => {
    const clientId = ulid();
    const formattedName = clientInput.clientName ? clientInput.clientName.trim().replace(/\s+/g, "") : "";

        const client: Client = {
            clientId,
            clientName: formattedName,
            clientPhone: clientInput.clientPhone,
            email: clientInput.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Store Chef data in DynamoDB
        const params = {
            RequestItems: {
                "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `CLIENTS`,
                                SK: `CLIENT#${formattedName}`,
                                type: "client",
                                ...client
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `CLIENT#${formattedName}`,
                                SK: `CLIENT#${clientId}`,
                                type: 'client',
                                ...client,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };
        try {

        await docClient.batchWrite(params).promise();
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);
        return client;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createClient;

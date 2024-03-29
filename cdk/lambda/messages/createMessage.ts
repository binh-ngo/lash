const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Message, MessageInput } from "../types";
require("dotenv").config({ path: ".env" });
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({region: 'us-east-1'});

const createMessage = async (messageInput: MessageInput) => {
    const messageId = ulid();
    const threadId = ulid();

        const message: Message = {
            messageId,
            body: messageInput.body,
            authorName: messageInput.authorName,
            authorId: messageInput.authorId,
            appointmentId: messageInput.appointmentId,
            createdAt: new Date().toISOString(),
        };

        // Store Chef data in DynamoDB
        const messageParams = {
            RequestItems: {
                "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK": [
                    {
                        // allows you to query for a single message
                        // May be unnecessary
                        PutRequest: {
                            Item: {
                                PK: `MESSAGE#${messageId}`,
                                SK: `MESSAGE#${messageId}`,
                                type: 'message',
                                ...message,
                            },
                        },
                    },
                    {
                        // allows you to query for all messages in a project
                        PutRequest: {
                            Item: {
                                PK: `APPOINTMENT#${messageInput.appointmentId}`,
                                SK: `MESSAGE#${messageId}`,
                                type: 'message',
                                ...message,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        const snsParams = {
            Subject: `New message on Appointment-${message.appointmentId}`,
            Message: `You received a message from ${message.authorName}! Log in and check it out: https://schedule.builders/projects/${message.appointmentId}
            `, 
            TopicArn: process.env.DEFAULT_TOPIC_ARN + `ProjectBidNotifications-${message.appointmentId}`
          };

        try {
        const createdMessage = await docClient.batchWrite(messageParams).promise();
        console.log(`Created message: ${JSON.stringify(message, null, 2)}`);
        
        if (createdMessage) {
            try {
                const snsResult = await snsClient.send(new PublishCommand(snsParams));
                console.log(`SNS Result: ${JSON.stringify(snsResult, null, 2)}`);
            } catch (err) {
                console.log(`SNS Error: ${JSON.stringify(err, null, 2)}`);
                throw err;
            }
        }
        return message;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createMessage;

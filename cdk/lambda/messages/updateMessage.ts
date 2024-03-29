const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Message, MessageInput, } from "../types";
import getMessageById from "./getMessageById";

const updateMessage = async (
    messageId: string,
    messageInput: MessageInput
) => {

    if (!messageInput || !messageId) {
        return { statusCode: 400, body: 'Invalid request, missing parameters' };
    }

    const retrievedMessage = await getMessageById(messageId);

    const message: Message = {
        appointmentId: messageInput.appointmentId ? messageInput.appointmentId : retrievedMessage.appointmentId,
        authorId: messageInput.authorId ? messageInput.authorId : retrievedMessage.authorId,
        authorName: messageInput.authorName ? messageInput.authorName : retrievedMessage.authorName,
        messageId: retrievedMessage.messageId,
        body: messageInput.body ? messageInput.body : retrievedMessage.body,
        createdAt: retrievedMessage.createdAt,
    };
    try {
        console.log(`UPDATE appointment called with:` + JSON.stringify(`Message ID: ${messageId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF messageInput --------- ${typeof (messageInput)}`);

        const params = {
            RequestItems: {
                "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK": // batchWriteRequests
                    [
                        {
                            PutRequest: {
                                Item: {
                                    PK: `MESSAGE#${message.messageId}`,
                                    SK: `MESSAGE#${message.messageId}`,
                                    type: 'message',
                                    ...message,
                                },
                            },
                        },
                        {
                            PutRequest: {
                                Item: {
                                    PK: `APPOINTMENT#${message.appointmentId}`,
                                    SK: `MESSAGE#${message.messageId}`,
                                    type: 'message',
                                    ...message,
                                },
                            },
                        },
                    ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        console.log(`params: ${JSON.stringify(params, null, 2)}`);

        await docClient.batchWrite(params).promise();

        console.log(`updatedAppointment: ${JSON.stringify(message, null, 2)}`);

        return message;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateMessage;
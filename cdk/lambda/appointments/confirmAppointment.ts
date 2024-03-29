import { Appointment } from "../types";
import getAppointmentById from "./getAppointmentById";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const sns = new AWS.SNS();
const snsClient = new SNSClient({ region: 'us-east-1' });

const confirmAppointment = async (
    appointmentId: string,
    isConfirmed: boolean
) => {

    const retrievedAppointment = await getAppointmentById(appointmentId);

    if (!retrievedAppointment) {
        console.error(`Appointment with ID ${appointmentId} not found.`);
    }
    // const username = retrievedAppointment.email ? retrievedAppointment.email.split("@")[0] : '';

    const appointment: Appointment = {
        ...retrievedAppointment,
        isConfirmed: isConfirmed ? isConfirmed : retrievedAppointment.isConfirmed,
        publishDate: isConfirmed ? new Date().toISOString() : ''
    }

    const params = {
        RequestItems: {
            "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK":
                [
                    {
                        PutRequest: {
                            Item: {
                                type: "appointment",
                                ...appointment,
                                PK: `APPOINTMENTS`,
                                SK: `APPOINTMENT#${appointmentId}`
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                type: 'appointment',
                                ...appointment,
                                PK: `APPOINTMENT#${appointmentId}`,
                                SK: `APPOINTMENT#${appointmentId}`,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                type: 'appointment',
                                ...appointment,
                                PK: `CLIENT#${retrievedAppointment.clientName}`,
                                SK: `APPOINTMENT#${appointmentId}`,
                            },
                        },
                    },
                ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    // const contractorNotificationParams = {
    //     Subject: "New Appointment Created",
    //     Message: `A new appointment in the ${city} area has entered the Workshop! Check it out: https://schedule.builders/pro/workshop
    //     `,
    //     TopicArn: process.env.TOPIC_ARN
    // };

    try {
        // replaces all entities above with updated values
        const updatedAppointment = await docClient.batchWrite(params).promise();

        console.log(`updatedConfirmAppointment: ${JSON.stringify(updatedAppointment, null, 2)}`);


        // if (updatedAppointment) {
        //     try {
        //         // sends a notification to contractors that a new appointment is confirmed
        //         const snsResult = await snsClient.send(new PublishCommand(contractorNotificationParams));
        //         console.log(`SNS Result: ${JSON.stringify(snsResult, null, 2)}`);

        //         // creates a topic for the client's appointment
        //         const subscribeClientToTheirAppointmentTopic = {
        //             Name: `AppointmentBidNotifications-${appointmentId}`,
        //         };
        //         const snsTopic = await sns.createTopic(subscribeClientToTheirAppointmentTopic).promise();

        //         // subscribes the client to their appointment topic to receive
        //         // notifications on bids/messages
        //         const subscribeParams = {
        //             Protocol: "email",
        //             TopicArn: snsTopic.TopicArn,
        //             Endpoint: appointment.email,
        //         };
        //         await sns.subscribe(subscribeParams).promise();
        //     } catch (err) {
        //         console.log(`SNS Error: ${JSON.stringify(err, null, 2)}`);
        //         throw err;
        //     }
        // };
        return appointment;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default confirmAppointment;
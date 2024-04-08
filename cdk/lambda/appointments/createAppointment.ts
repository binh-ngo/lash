const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Client, Appointment, AppointmentInput } from "../types";
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const sns = new AWS.SNS();
const snsClient = new SNSClient({ region: 'us-east-1' });
require("dotenv").config({ path: ".env" });

const createAppointment = async (appointmentInput: AppointmentInput) => {
    const appointmentId = ulid();
    const clientId = ulid();

    const formattedName = appointmentInput.clientName ? appointmentInput.clientName.toLowerCase().trim().replace(/\s+/g, "") : "";

    const client: Client = {
        clientId,
        clientName: formattedName,
        clientPhone: appointmentInput.clientPhone,
        email: appointmentInput.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const appointment: Appointment = {
        clientId,
        clientName: formattedName,
        clientPhone: appointmentInput.clientPhone,
        email: appointmentInput.email,
        appointmentId,
        appointmentType: appointmentInput.appointmentType,
        firstAppointment: appointmentInput.firstAppointment,
        secondAppointment: appointmentInput.secondAppointment,
        isConfirmed: false,
        date: appointmentInput.date,
        confirmedDate: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Store Appointment and Client data in DynamoDB
    const params = {
        RequestItems: {
            "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK": [
                {
                    PutRequest: {
                        Item: {
                            PK: `APPOINTMENTS`,
                            SK: `APPOINTMENT#${appointmentId}`,
                            type: "appointment",
                            ...appointment
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `APPOINTMENT#${appointmentId}`,
                            SK: `APPOINTMENT#${appointmentId}`,
                            type: 'appointment',
                            ...appointment,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${client.clientName}`,
                            SK: `APPOINTMENT#${appointmentId}`,
                            type: 'appointment',
                            ...appointment,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENTS`,
                            SK: `CLIENT#${client.clientName}`,
                            type: 'client',
                            ...client,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `CLIENT#${client.clientName}`,
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

    const notificationParams = {
        Subject: "New Booking Received!",
        Message: `
        Name: ${appointment.clientName}
        Phone: ${appointment.clientPhone}
        Email: ${appointment.email}
        Date: ${appointment.date}
        Appointment Type: ${appointment.appointmentType}
        First Choice Appointment: ${appointment.firstAppointment}
        Second Choice Appointment: ${appointment.secondAppointment}

        Please confirm this appointment within 24 hours. 
        `,
        TopicArn: process.env.TOPIC_ARN
    };

    try {
        
        const newAppointment = await docClient.batchWrite(params).promise();
        console.log(`Created appointment: ${JSON.stringify(appointment, null, 2)}`);
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);

        if(newAppointment) {
            try {
                const snsResult = await snsClient.send(new PublishCommand(notificationParams));
                console.log(`Notification sent: ${JSON.stringify(snsResult, null, 2)}`);
            }
            catch(err){
                console.log(`Error sending notification: ${JSON.stringify(err, null, 2)}`);
                throw err;
        }
    };
        return appointment;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createAppointment;

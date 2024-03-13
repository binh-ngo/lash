const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Client, Appointment, AppointmentInput } from "../types";

require("dotenv").config({ path: ".env" });


// TODO: as of right now, clients don't need to sign in, so they have to fill out the 
// form every time they want to do another appointment
const createAppointment = async (appointmentInput: AppointmentInput) => {
    const appointmentId = ulid();
    const clientId = ulid();

    const formattedName = appointmentInput.clientName ? appointmentInput.clientName.trim().replace(/\s+/g, "") : "";

    // function extractUsernameFromEmail(email: string) {
    //     const emailParts = email.split('@');
    //     if (emailParts.length !== 2) {
    //         console.error('Invalid email format');
    //         return null;
    //     }
    
    //     const username = emailParts[0];
    //     return username;
    // }

    const client: Client = {
        clientId,
        clientName: formattedName,
        clientPhone: appointmentInput.clientPhone,
        email: appointmentInput.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Patios 10-20 / sqft
    // https://www.bankrate.com/homeownership/how-much-does-it-cost-to-build-a-deck/#how-much-it-costs

    const appointment: Appointment = {
        clientId,
        clientName: formattedName,
        clientPhone: appointmentInput.clientPhone,
        email: appointmentInput.email,
        appointmentId,
        appointmentType: appointmentInput.appointmentType,
        technicianName: appointmentInput.technicianName,
        technicianId: appointmentInput.technicianId,
        isConfirmed: false,
        publishDate: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Store Appointment and Client data in DynamoDB
    const params = {
        RequestItems: {
            "ContractorSiteContractorBackendStackC9C337A3-ContractorSiteTableEFCEEB4B-DSY0RC8FT3VB": [
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
    
    try {
        const newAppointment = await docClient.batchWrite(params).promise();
        console.log(`Created appointment: ${JSON.stringify(appointment, null, 2)}`);
        console.log(`Created client: ${JSON.stringify(client, null, 2)}`);
        return appointment;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createAppointment;

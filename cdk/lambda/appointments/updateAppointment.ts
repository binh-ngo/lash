const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Appointment, AppointmentInput } from "../types";
import getAppointmentById from "./getAppointmentById";

const updateAppointment = async (
    appointmentId: string,
    appointmentInput: AppointmentInput
) => {

    if (!appointmentInput || !appointmentId) {
        return { statusCode: 400, body: 'Invalid request, missing parameters' };
    }
    const retrievedAppointment = await getAppointmentById(appointmentId);

    const appointment: Appointment = {
        clientName: retrievedAppointment.clientName,
        clientId: retrievedAppointment.clientId,
        appointmentId: retrievedAppointment.appointmentId,
        email: appointmentInput.email ? appointmentInput.email : retrievedAppointment.email,
        clientPhone: appointmentInput.clientPhone ? appointmentInput.clientPhone : retrievedAppointment.clientPhone,
        appointmentType: appointmentInput.appointmentType ? appointmentInput.appointmentType : retrievedAppointment.appointmentType,
        date: appointmentInput.date ? appointmentInput.date : retrievedAppointment.date,
        firstAppointment: appointmentInput.firstAppointment ? appointmentInput.firstAppointment : retrievedAppointment.firstAppointment,
        secondAppointment: appointmentInput.secondAppointment ? appointmentInput.secondAppointment : retrievedAppointment.secondAppointment,
        isConfirmed: appointmentInput.isConfirmed ? appointmentInput.isConfirmed : retrievedAppointment.isConfirmed,
        confirmedDate: appointmentInput.confirmedDate ? appointmentInput.confirmedDate : retrievedAppointment.confirmedDate,
        createdAt: retrievedAppointment.createdAt,
        updatedAt: new Date().toISOString(),
    };
    // TODO: Code below is a simplified way of writing the appointment object but it doesnt
    // work. need to troubleshoot
    // const appointment: Appointment = {
    //     ...retrievedAppointment, // Spread the retrieved appointment's properties
    //     ...appointmentInput,   // Spread the updated properties
    //     updatedAt: new Date().toISOString(),
    // };

    console.log(`UPDATE appointment called with:` + JSON.stringify(`Appointment ID: ${appointmentId}`));
    // const eventBody = JSON.parse(event.body);
    // console.log(`EVENT BODY ${eventBody}`);
    console.log(`TYPEOF appointmentInput --------- ${typeof (appointmentInput)}`);

    const params = {
        RequestItems: {
            "LashSiteBackendStack448F6DFB-LashSiteTable7E458D9E-1C2NWPVUALTPK":
                [
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
                                PK: `CLIENT#${appointment.clientName}`,
                                SK: `APPOINTMENT#${appointmentId}`,
                                type: 'appointment',
                                ...appointment,
                            },
                        },
                    },
                ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        await docClient.batchWrite(params).promise();

        console.log(`updatedAppointment: ${JSON.stringify(appointment, null, 2)}`);

        return appointment;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};
export default updateAppointment;
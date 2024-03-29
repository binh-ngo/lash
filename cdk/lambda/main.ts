import confirmAppointment from "./appointments/confirmAppointment";
import createAppointment from "./appointments/createAppointment";
import deleteAppointment from "./appointments/deleteAppointment";
import getAllAppointments from "./appointments/getAllAppointments";
import getAllAppointmentsFromAllClients from "./appointments/getAllAppointmentsFromAllClients";
import getAppointmentById from "./appointments/getAppointmentById";
import getAllConfirmedAppointmentsFromAllClients from "./appointments/getConfirmedAppointments";
import getAllUnconfirmedAppointmentsFromAllClients from "./appointments/getUnconfirmedAppointments";
import updateAppointment from "./appointments/updateAppointment";
import deleteClient from "./clients/deleteClient";
import getAllClients from "./clients/getAllClients";
import getClientById from "./clients/getClientById";
import updateClient from "./clients/updateClient";
import createMessage from "./messages/createMessage";
import deleteMessage from "./messages/deleteMessage";
import getAllMessages from "./messages/getAllMessages";
import getMessageById from "./messages/getMessageById";
import updateMessage from "./messages/updateMessage";
import { AppointmentAppsyncEvent, ClientAppsyncEvent, MessageAppsyncEvent } from "./types";

export async function handler(event: any): Promise<any> {
  console.log(`EVENT --- ${JSON.stringify(event)}`);
  const eventType = getEventType(event);

  if (eventType === "Client") {
    return handleClientEvent(event);
  } else if (eventType === "Appointment") {
    return handleAppointmentEvent(event);
  }
  else if (eventType === "Message") {
    return handleMessageEvent(event);
  }
  else {
    throw new Error(`Unknown event type.`);
  }
}

// Function to determine the event type based on the field name
function getEventType(event: any): "Client" | "Appointment" | "Message"{
  switch (event.info.fieldName) {
    case "getAllAppointments":
    case "getAllAppointmentsFromAllClients":
    case "getAllPublishedAppointmentsFromAllUsers":
    case "getAllUnpublishedAppointmentsFromAllUsers":
    case "getAppointmentById":
    case "publishAppointment":
    case "createAppointment":
    case "confirmAppointment":
    case "deleteAppointment":
    case "updateAppointment":
      return "Appointment";
    case "getAllClients":
    case "getClientById":
    case "deleteClient":
    case "updateClient":
      return "Client";
    case "getAllMessages":
    case "getMessageById":
    case "createMessage":
    case "updateMessage":
    case "deleteMessage":
      return "Message";
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for Client events
function handleClientEvent(event: ClientAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getClientById":
      return getClientById(event.arguments.clientName!, event.arguments.clientId!);
    case "getAllClients":
      return getAllClients();
    case "updateClient":
      return updateClient(
        event.arguments.clientName!,
        event.arguments.clientId!,
        event.arguments.clientInput!
      );
    case "deleteClient":
      return deleteClient(event.arguments.clientName!, event.arguments.clientId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for Appointment events
function handleAppointmentEvent(event: AppointmentAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getAppointmentById":
      return getAppointmentById(event.arguments.appointmentId!);
    case "getAllAppointments":
      return getAllAppointments(event.arguments.clientName!);
    case "getAllAppointmentsFromAllClients":
      return getAllAppointmentsFromAllClients();
    case "getAllConfirmedAppointmentsFromAllClients":
      return getAllConfirmedAppointmentsFromAllClients();
    case "getAllUnconfirmedAppointmentsFromAllClients":
      return getAllUnconfirmedAppointmentsFromAllClients();
    case "confirmAppointment":
      return confirmAppointment(event.arguments.appointmentId!, event.arguments.isConfirmed!);
    case "createAppointment":
      return createAppointment(event.arguments.appointmentInput!);
    case "updateAppointment":
      return updateAppointment(
        event.arguments.appointmentId!,
        event.arguments.appointmentInput!
      );
    case "deleteAppointment":
      return deleteAppointment(event.arguments.clientName!, event.arguments.appointmentId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for Message events
function handleMessageEvent(event: MessageAppsyncEvent) {
  switch (event.info.fieldName) {
    case "getMessageById":
      return getMessageById(event.arguments.messageId!);
    case "getAllMessages":
      return getAllMessages(event.arguments.appointmentId!);
    case "createMessage":
      return createMessage(event.arguments.messageInput!);
    case "updateMessage":
      return updateMessage(
        event.arguments.messageId!,
        event.arguments.messageInput!
      );
    case "deleteMessage":
      return deleteMessage(event.arguments.authorName!, event.arguments.messageId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}
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
    case "getAllAppointmentsWithEstimates":
    case "getAllAppointmentsWithEstimatesAndContractors":
    case "getAllAppointmentsWithoutEstimates":
    case "getPublishedAppointments":
    case "getUnpublishedAppointments":
    case "getAllPublishedAppointmentsFromAllUsers":
    case "getAllUnpublishedAppointmentsFromAllUsers":
    case "getAppointmentById":
    case "publishAppointment":
    case "createAppointment":
    case "deleteAppointment":
    case "updateAppointment":
      return "Appointment";
    case "getAllClients":
    case "getClientById":
    case "deleteClient":
    case "updateClient":
      return "Client";
    case "getAllMessages":
    case "getMessagesInThread":
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
    case "getAllAppointmentsWithEstimates":
      return getAllAppointmentsWithEstimates();
    case "getAllAppointmentsWithEstimatesAndContractors":
      return getAllAppointmentsWithEstimatesAndContractors();
    case "getAllAppointmentsWithoutEstimates":
      return getAllAppointmentsWithoutEstimates();
    case "getPublishedAppointments":
      return getPublishedAppointments(event.arguments.clientName!);
    case "getUnpublishedAppointments":
      return getUnpublishedAppointments(event.arguments.clientName!);
    case "getAllPublishedAppointmentsFromAllClients":
      return getAllPublishedAppointmentsFromAllClients();
    case "getAllUnpublishedAppointmentsFromAllClients":
      return getAllUnpublishedAppointmentsFromAllClients();
    case "publishAppointment":
      return publishAppointment(event.arguments.appointmentId!, event.arguments.isPublished!);
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
    case "getMessagesInThread":
      return getMessagesInThread(event.arguments.appointmentId!, event.arguments.authorName1!, event.arguments.authorName2!);
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
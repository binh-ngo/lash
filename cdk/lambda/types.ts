export type ddbQueryPostsParams = {
    TableName: string;
    IndexName?: string;
    KeyConditionExpression?: string;
    ExpressionAttributeNames?: { [key: string]: string };
    ExpressionAttributeValues?: { [key: string]: any };
    FilterExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ScanIndexForward?: boolean;
  };

//~~~~~~~~~~~~~~~~~~~~~~  //
//      Client Types      //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Client = {
    clientId: string;
    clientName: string
    clientPhone: string;
    email:string;
    createdAt: string
    updatedAt: string
}

export type ClientInput = {
    clientName: string;
    email: string;
    clientPhone: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//   Appointment Types    //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Appointment = {
    clientName: string;
    clientId: string;
    clientPhone: string;
    email: string;
    date: string;
    appointmentId: string;
    firstAppointment: string;
    secondAppointment: string;
    confirmedDate: string;
    appointmentType: string;
    createdAt: string;
    updatedAt: string;
    isConfirmed: boolean;
}

export type AppointmentInput = {
    clientName: string;
    clientPhone: string;
    date: string;
    email: string;
    firstAppointment: string;
    secondAppointment: string;
    appointmentType: string;
    isConfirmed: boolean;
    confirmedDate: string;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//  Messages Event Types  //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Message = {
  messageId: string;
  body: string;
  authorId: string;
  authorName: string;
  appointmentId: string;
  createdAt: string;
}

export type MessageInput = {
  authorId: string;
  authorName: string;
  recipientId: string;
  recipientName: string;
  appointmentId: string;
  body: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//  Appsync Event Types   //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type ClientAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        clientId?: string;
        clientName?: string;
        clientInput?: ClientInput;
      };
}

export type AppointmentAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        appointmentId?: string;
        clientName?: string;
        appointmentInput?: AppointmentInput;
        isConfirmed?: boolean
      };
}

export type MessageAppsyncEvent = {
    info: {
        fieldName: string;
      };
      arguments: {
        messageId?: string;
        threadId?: string;
        appointmentId?: string;
        authorName?: string;
        messageInput?: MessageInput;
      };
}

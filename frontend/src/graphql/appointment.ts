import { API } from "aws-amplify";

// ===========
// CREATE APPOINTMENT
// ===========

export type SaveAppointmentProps = {
  appointmentId?: string;
  clientName: string;
  clientPhone: string;
  email: string;
  date: string;
  firstAppointment: string;
  secondAppointment: string;
  appointmentType: string;
  };

const createAppointmentQuery = `
  mutation createAppointment($appointmentInput: AppointmentInput!) {
    createAppointment(appointmentInput: $appointmentInput) {
      appointmentId
      appointmentType
      clientId
      clientName
      clientPhone
      email
      date
      firstAppointment
      secondAppointment
      confirmedDate
      isConfirmed
      createdAt
      updatedAt
    }
  }
`;

export const ddbCreateAppointment = async (appointmentInput: SaveAppointmentProps) => {

const resp = await API.graphql({
  query: createAppointmentQuery,
  variables: {
    appointmentInput: {
      clientName: appointmentInput.clientName,
      clientPhone: appointmentInput.clientPhone,
      email: appointmentInput.email,
      date: appointmentInput.date,
      firstAppointment: appointmentInput.firstAppointment,
      secondAppointment: appointmentInput.secondAppointment,
      appointmentType: appointmentInput.appointmentType,
    },
  },
  authMode: "API_KEY",
});
// console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
  

  // ==============
// GET Appointment By ID
// ==============

const getAppointmentByIdQuery = `
    query getAppointmentById($appointmentId: String!) {
      getAppointmentById(appointmentId: $appointmentId) {
        appointmentId
        appointmentType
        clientId
        clientName
        clientPhone
        email
        date
        firstAppointment
        secondAppointment
        confirmedDate
        isConfirmed
        createdAt
        updatedAt
      }
    }
  `;

export const ddbGetAppointmentById = async (appointmentId: string) => {
  const resp = await API.graphql({
    query: getAppointmentByIdQuery,
    variables: {
      appointmentId,
    },
    authMode: "API_KEY"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  const appointment = resp.data.getAppointmentById;
  return appointment;
};

// =========
// GET ALL APPOINTMENTS
// =========

const getAllAppointmentsQuery = `
query getAllAppointments($clientName: String!) {
  getAllAppointments(clientName: $clientName) {
    appointmentId
    appointmentType
    clientId
    clientName
    clientPhone
    email
    date
    firstAppointment
    secondAppointment
    confirmedDate
    isConfirmed
    createdAt
    updatedAt
  }
}
`;

export const ddbGetAllAppointments = async (clientName: string) => {
  const resp = await API.graphql({ 
    query: getAllAppointmentsQuery,
    variables: {
      clientName
    },
    authMode: "API_KEY"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllAppointments;
};

const getAllAppointmentsFromAllClientsQuery = `
query getAllAppointmentsFromAllClients {
  getAllAppointmentsFromAllClients {
    appointmentId
    appointmentType
    clientId
    clientName
    clientPhone
    email
    date
    firstAppointment
    secondAppointment
    confirmedDate
    isConfirmed
    createdAt
    updatedAt
  }
}
`;
export const ddbGetAllAppointmentsFromAllClients = async () => {
  const resp = await API.graphql({ 
    query: getAllAppointmentsFromAllClientsQuery,
    authMode: "API_KEY"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllAppointmentsFromAllClients;
};

const updateAppointmentQuery = `
    mutation updateAppointment($appointmentId: String!, $appointmentInput: AppointmentInput!) {
      updateAppointment(appointmentId: $appointmentId, appointmentInput: $appointmentInput) {
        appointmentId
        appointmentType
        clientId
        clientName
        clientPhone
        email
        date
        firstAppointment
        secondAppointment
        confirmedDate
        isConfirmed
        createdAt
        updatedAt
      }
    }
  `;

export const ddbUpdateAppointment = async (appointmentInput: SaveAppointmentProps) => {

  const resp = await API.graphql({
    query: updateAppointmentQuery,
    variables: {
      appointmentId: appointmentInput.appointmentId,
      appointmentInput: {
        clientName: appointmentInput.clientName,
        clientPhone: appointmentInput.clientPhone,
        email: appointmentInput.email,
        date: appointmentInput.date,
        firstAppointment: appointmentInput.firstAppointment,
        secondAppointment: appointmentInput.secondAppointment,
        appointmentType: appointmentInput.appointmentType,
    },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  return resp;
};

// ===========
// DELETE POST
// ===========

const deleteQuery = `
  mutation deleteAppointment($clientName: String!, $appointmentId: String!) {
    deleteAppointment(clientName: $clientName, appointmentId: $appointmentId)
  }
`;

export const ddbDeleteAppointment = async (appointmentId: string, clientName: string) => {
  console.log(`delete called for client ${clientName}`);
  const resp = await API.graphql({
    query: deleteQuery,
    variables: {
      clientName,
      appointmentId,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  // console.log(`successfully deleted: ${resp.data.deleteAppointment}`);
};
// REMOVED CLIENT NAME FROM PARAMS
const confirmAppointmentQuery = `
  mutation confirmAppointment($appointmentId: String!, $isConfirmed: Boolean!) {
    confirmAppointment(appointmentId: $appointmentId, isConfirmed: $isConfirmed) {
      appointmentId
      appointmentType
      clientId
      clientName
      clientPhone
      email
      date
      firstAppointment
      secondAppointment
      confirmedDate
      isConfirmed
      createdAt
      updatedAt
    }
  }
`
export const ddbConfirmAppointment = async (appointmentId: string, isConfirmed: boolean) => {
  console.log(`Post getting ready to be confirmed with appointmentId: ${appointmentId}`);
  const resp = await API.graphql({
    query: confirmAppointmentQuery,
    variables: {
      appointmentId,
      isConfirmed
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  // console.log(`appointment ${appointmentId} successfully confirmed: ${resp.data.confirmAppointment}`);
}

const getAllConfirmedAppointmentsFromAllClientsQuery = `
query getAllConfirmedAppointmentsFromAllClients {
  getAllConfirmedAppointmentsFromAllClients {
    appointmentId
    appointmentType
    clientId
    clientName
    clientPhone
    email
    date
    firstAppointment
    secondAppointment
    confirmedDate
    isConfirmed
    createdAt
    updatedAt
  }
}
`;
export const ddbGetAllConfirmedAppointmentsFromAllClients = async () => {
  const resp = await API.graphql({ 
    query: getAllConfirmedAppointmentsFromAllClientsQuery,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllConfirmedAppointmentsFromAllClients;
};

const getAllUnconfirmedAppointmentsFromAllClientsQuery = `
query getAllUnconfirmedAppointmentsFromAllClients {
  getAllUnconfirmedAppointmentsFromAllClients {
    appointmentId
    appointmentType
    clientId
    clientName
    clientPhone
    email
    date
    firstAppointment
    secondAppointment
    confirmedDate
    isConfirmed
    createdAt
    updatedAt
  }
}
`;
export const ddbGetAllUnconfirmedAppointmentsFromAllClients = async () => {
  const resp = await API.graphql({ 
    query: getAllUnconfirmedAppointmentsFromAllClientsQuery,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllUnconfirmedAppointmentsFromAllClients;
};
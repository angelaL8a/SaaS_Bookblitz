import { gql } from "graphql-tag";

export const appointmentTypeDefs = gql`
  type Appointment {
    id: ID!
    referencialImageUrl: String
    referencialImageId: String
    startTime: DateTime!
    endTime: DateTime!
    date: DateTime!
    title: String!
    description: String!
    fee: Float!
    rating: Int!
    status: AppointmentStatus!

    shift: Shift!
    shiftId: String!

    comments: [CommentOnAppointment!]!

    client: UserInCompany!
    clientId: String!
  }

  type CommentOnAppointment {
    id: ID!
    content: String!

    appointment: Appointment!
    appointmentId: String!

    creator: UserInCompany!
    creatorId: String!
  }
`;

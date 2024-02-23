import { gql } from "graphql-tag";

export const shiftTypeDefs = gql`
  type Shift {
    id: ID!
    checkInTime: DateTime!
    checkOutTime: DateTime!
    date: DateTime!

    employee: UserInCompany!
    employeeId: String!
    appointments: [Appointment!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input AppointmentDto {
    referencialImageUrl: String
    referencialImageId: String
    startTime: DateTime!
    endTime: DateTime!
    title: String!
    description: String!
    fee: Float!
    clientId: String!
  }

  input ShiftDto {
    checkInTime: String!
    checkOutTime: String!
    date: String!
    employeeId: String!
    appointments: [AppointmentDto!]!
  }

  input CommentDto {
    content: String!
    appointmentId: String!
  }

  type Mutation {
    Shift_CreateShift(shiftDto: ShiftDto!, companyId: String!): Shift!
    Appointment_CreateComment(commentDto: CommentDto!): CommentOnAppointment!
  }
`;

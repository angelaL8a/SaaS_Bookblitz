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
    id: String
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
    checkInTime: DateTime!
    checkOutTime: DateTime!
    date: DateTime!
    employeeId: String!
    appointments: [AppointmentDto!]!
  }

  input UpdateShiftDto {
    checkInTime: DateTime!
    checkOutTime: DateTime!
    appointments: [AppointmentDto!]!
  }

  input CommentDto {
    content: String!
    appointmentId: String!
  }

  type Mutation {
    Shift_CreateShift(shiftDto: ShiftDto!, companyId: String!): Shift!
    Shift_UpdateShift(
      shiftId: String!
      shiftDto: UpdateShiftDto!
      companyId: String!
    ): Shift!
    Appointment_CreateComment(commentDto: CommentDto!): CommentOnAppointment!
  }
`;

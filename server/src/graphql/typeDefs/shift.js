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
`;

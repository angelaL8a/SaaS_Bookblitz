import { gql } from "graphql-tag";

export const companyTypeDefs = gql`
  type Company {
    id: ID!
    name: String!
    url: String!
    role: UserCompanyRole

    users: [UserInCompany!]!
    shifts: [Shift!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserInCompany {
    id: ID!
    user: User!
    userId: String!
    company: Company!
    companyId: String!
    role: UserCompanyRole!

    telephone: String
    birthDate: DateTime
    gender: String

    appointments: [Appointment!]!
    shifts: [Shift!]!
    comments: [CommentOnAppointment!]!

    email: EmailAddress
    startingDate: DateTime
    position: String
    paymentPerHour: Float
    city: String
    state: String
    zip: String
    address: String
    employeeColor: String
  }

  input AddEmployeeDto {
    firstName: String!
    lastName: String!
    birthDate: DateTime!
    gender: String!
    startingDate: DateTime!
    position: String!
    city: String
    state: String
    zip: String
    address: String
    email: EmailAddress!
    telephone: String!
    paymentPerHour: Float!
    userImageUrl: String
    userImageId: String
    employeeColor: String
  }

  input AddClientDto {
    firstName: String!
    lastName: String!
    birthDate: DateTime
    gender: String!
    email: EmailAddress!
    telephone: String!
    userImageUrl: String
    userImageId: String
  }

  type HoursAndPayment {
    hoursWorked: Int!
    grossPay: Float!
    paymentPerHour: Float!
    avgHours: Float!
  }

  type PayrollEmployee {
    employee: UserInCompany!
    hoursAndPayment(filter: PayrollFilterInput!): HoursAndPayment!
  }

  input PayrollFilterInput {
    fromMonth: Int!
    toMonth: Int!
    startDay: Int!
    endDay: Int!
    fromYear: Int!
    toYear: Int!
  }

  type Query {
    # Admin queries
    GetCompany(companyUrl: String!): Company!
    Company_GetPayroll(companyId: String!): [PayrollEmployee!]!

    # Employee queries
    Company_GetEmployeeCompany(companyUrl: String!): Company!
  }

  type Mutation {
    Company_AddEmployee(
      employeeDto: AddEmployeeDto!
      companyId: String!
    ): UserInCompany!
    Company_AddClient(
      clientDto: AddClientDto!
      companyId: String!
    ): UserInCompany!

    Company_DeleteEmployee(
      companyId: String!
      employeeId: String!
    ): UserInCompany!
    Company_DeleteClient(companyId: String!, clientId: String!): UserInCompany!
  }
`;

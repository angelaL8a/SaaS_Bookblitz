import { gql } from "graphql-tag";

export const companyTypeDefs = gql`
  type Company {
    id: ID!
    name: String!
    url: String!
    role: UserCompanyRole
    users: [UserInCompany!]!
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

    startingDate: DateTime
    position: String
    paymentPerHour: Float
    city: String
    state: String
    zip: String
    address: String
  }

  input AddEmployeeDto {
    firstName: String!
    lastName: String!
    birthDate: DateTime
    gender: String!
    startingDate: DateTime
    position: String!
    city: String
    state: String
    zip: String
    address: String
    email: EmailAddress!
    telephone: String!
    paymentPerHour: Float!
  }

  input AddClientDto {
    firstName: String!
    lastName: String!
    birthDate: DateTime
    gender: String!
    email: EmailAddress!
    telephone: String!
  }

  type Query {
    GetCompany(companyUrl: String!): Company!
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
  }
`;

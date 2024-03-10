import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    firstName: String!
    lastName: String!
    email: EmailAddress
    username: String!
    password: String
    userImageUrl: String
    userImageId: String

    companies: [Company!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input UserRegisterDto {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    username: String!
    password: String!
    companyName: String!
    companyURL: String!
  }

  input UserLoginDto {
    username: String!
    password: String!
  }

  input UserUpdateDto {
    firstName: String!
    lastName: String!
    gender: String
    telephone: String
  }

  type Query {
    GetAccount: User!
  }

  type Mutation {
    RegisterUser(userDto: UserRegisterDto!): String!
    LoginUser(userDto: UserLoginDto!): String!
    UpdateProfile(userDto: UserUpdateDto!, companyUrl: String!): String!
  }
`;

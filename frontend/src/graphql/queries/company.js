import { gql } from "graphql-request";

export const GetCompany = gql`
  query GetCompany($companyUrl: String!) {
    GetCompany(companyUrl: $companyUrl) {
      id
      name
      url
      role
      createdAt
      users {
        id
        role
        user {
          id
          name
          username
          password
          userImageUrl
        }
      }
    }
  }
`;

import { gql } from "graphql-request";

export const GetAccount = gql`
  query GetAccount {
    GetAccount {
      id
      firstName
      lastName
      username
      userImageUrl
      companies {
        id
        name
        url
        role
      }
    }
  }
`;

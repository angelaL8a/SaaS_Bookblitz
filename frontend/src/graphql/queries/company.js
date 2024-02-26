import { gql } from "graphql-request";

const FRAGMENT_USER = gql`
  fragment UserDetails on UserInCompany {
    id
    role
    employeeColor
    user {
      id
      name
      firstName
      lastName
      username
      userImageUrl
    }
  }
`;

export const GetCompany = gql`
  query GetCompany($companyUrl: String!) {
    GetCompany(companyUrl: $companyUrl) {
      id
      name
      url
      role
      createdAt
      users {
        ...UserDetails
      }
      shifts {
        id
        checkInTime
        checkOutTime
        date
        employee {
          ...UserDetails
        }
        appointments {
          id
          title
          description
          referencialImageUrl
          referencialImageId
          fee
          status
          startTime
          endTime
          date
          client {
            ...UserDetails
          }
        }
      }
    }
  }

  ${FRAGMENT_USER}
`;

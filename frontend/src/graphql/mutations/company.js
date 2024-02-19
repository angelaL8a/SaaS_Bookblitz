import { gql } from "graphql-request";

export const Company_AddEmployee = gql`
  mutation Company_AddEmployee(
    $employeeDto: AddEmployeeDto!
    $companyId: String!
  ) {
    Company_AddEmployee(employeeDto: $employeeDto, companyId: $companyId) {
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
`;

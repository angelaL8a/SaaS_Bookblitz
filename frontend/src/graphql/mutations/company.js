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

export const Company_AddClient = gql`
  mutation Company_AddClient($clientDto: AddClientDto!, $companyId: String!) {
    Company_AddClient(clientDto: $clientDto, companyId: $companyId) {
      id
      address
      role
      telephone
      birthDate
    }
  }
`;

export const Shift_CreateShift = gql`
  mutation Shift_CreateShift($shiftDto: ShiftDto!, $companyId: String!) {
    Shift_CreateShift(shiftDto: $shiftDto, companyId: $companyId) {
      id
      checkInTime
      checkOutTime
      date
      employee {
        id
        role
        user {
          id
          name
          userImageUrl
          username
        }
      }
    }
  }
`;

export const Shift_UpdateShift = gql`
  mutation Shift_UpdateShift(
    $shiftId: String!
    $shiftDto: UpdateShiftDto!
    $companyId: String!
  ) {
    Shift_UpdateShift(
      shiftId: $shiftId
      shiftDto: $shiftDto
      companyId: $companyId
    ) {
      id
      checkInTime
      checkOutTime
      date
      employee {
        id
        role
        user {
          id
          name
          userImageUrl
          username
        }
      }
    }
  }
`;

export const Shift_DeleteShift = gql`
  mutation Shift_DeleteShift($shiftId: String!, $companyId: String!) {
    Shift_DeleteShift(shiftId: $shiftId, companyId: $companyId) {
      id
    }
  }
`;

export const Company_DeleteEmployee = gql`
  mutation Company_DeleteEmployee($companyId: String!, $employeeId: String!) {
    Company_DeleteEmployee(companyId: $companyId, employeeId: $employeeId) {
      id
    }
  }
`;

export const Company_DeleteClient = gql`
  mutation Company_DeleteClient($companyId: String!, $clientId: String!) {
    Company_DeleteClient(companyId: $companyId, clientId: $clientId) {
      id
    }
  }
`;

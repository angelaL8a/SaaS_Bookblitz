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

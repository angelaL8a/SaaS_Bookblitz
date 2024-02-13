import { gql } from "graphql-request";

export const RegisterUser = gql`
  mutation RegisterUser($userDto: UserRegisterDto!) {
    RegisterUser(userDto: $userDto) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const LoginUser = gql`
  mutation LoginUser($userDto: UserLoginDto!) {
    LoginUser(userDto: $userDto)
  }
`;

import { gql } from "graphql-request";

export const RegisterUser = gql`
  mutation RegisterUser($userDto: UserRegisterDto!) {
    RegisterUser(userDto: $userDto)
  }
`;

export const LoginUser = gql`
  mutation LoginUser($userDto: UserLoginDto!) {
    LoginUser(userDto: $userDto)
  }
`;

export const UpdateProfile = gql`
  mutation UpdateProfile($userDto: UserUpdateDto!, $companyUrl: String!) {
    UpdateProfile(userDto: $userDto, companyUrl: $companyUrl)
  }
`;

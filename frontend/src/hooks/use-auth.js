import { client } from "@/graphql/client";
import { LoginUser, RegisterUser } from "@/graphql/mutations/user";
import { GetAccount } from "@/graphql/queries/user";
import { useMutation, useQuery } from "@tanstack/react-query";

// Handlers
/**
 * Handler function to register a new user.
 * @param {Object} userDto - User data transfer object containing user information.
 * @returns {Object} - Response data containing the result of the registration process.
 */
export const register = async (userDto) => {
  const data = await client.request(RegisterUser.toString(), {
    userDto: userDto,
  });

  return data.RegisterUser;
};

/**
 * Handler function to authenticate a user login.
 * @param {Object} userDto - User data transfer object containing user credentials.
 * @returns {Object} - Response data containing the result of the login process.
 */
export const login = async (userDto) => {
  const data = await client.request(LoginUser.toString(), {
    userDto: userDto,
  });

  return data.LoginUser;
};

export const account = async () => {
  const data = await client.request(GetAccount.toString());

  return data.GetAccount;
};

// Hooks
/**
 * Custom hook for registering a new user.
 * @returns {Object} - An object containing the pending status and a function to initiate user registration.
 */
export const useMutateRegisterUser = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (userDto) => register(userDto),
  });

  return { isPending, mutateAsync };
};

/**
 * Custom hook for user login.
 * @returns {Object} - An object containing the pending status and a function to initiate user login.
 */
export const useMutateLoginUser = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (userDto) => login(userDto),
  });

  return { isPending, mutateAsync };
};

export const useAuth = () => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => account(),
  });

  return { isLoading: isPending, data, refetch };
};

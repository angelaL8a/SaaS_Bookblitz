import { GraphQLClient } from "graphql-request";

/**
 * Description: This file contains the GraphQL client setup using graphql-request library.
 * It is responsible for sending requests, mutations, and queries to the GraphQL API.
 */

// https://vitejs.dev/guide/env-and-mode
export const client = new GraphQLClient(
  `${import.meta.env.VITE_SERVER_URL}/gql`,
  {
    credentials: "include",
    headers: () => {
      const token = window.localStorage.getItem("token");

      if (!token) return {};

      return {
        Authorization: `Bearer ${token}`,
      };
    },
  }
);

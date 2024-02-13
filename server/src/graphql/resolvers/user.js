// https://www.npmjs.com/package/jsonwebtoken
// https://www.npmjs.com/package/bcrypt
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/index.js";
import { GraphQLError } from "graphql";
import { BAD_USER_INPUT_CODE, UNAUTHENTICATED_CODE } from "../error-codes.js";
import { envs } from "../../config/env.js";
import { saltRounds } from "../../config/saltRounds.js";

export const userResolvers = {
  User: {
    companies: async (user) => {
      const companies = await db.company.findMany({
        where: {
          users: {
            some: {
              userId: user.id,
            },
          },
        },
      });

      return companies;
    },
  },

  Query: {
    GetAccount: async (_, __, context) => {
      if (!context.user) {
        throw new GraphQLError("User not logged in!", {
          extensions: { code: UNAUTHENTICATED_CODE },
        });
      }

      return context.user;
    },
  },

  Mutation: {
    RegisterUser: async (_, args) => {
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        companyName,
        companyURL,
      } = args.userDto;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Check if the email provided by the user already exists in the database
      const emailExists = await db.user.findUnique({
        where: { email: email },
      });

      // Check if the username provided by the user already exists in the database
      const usernameExists = await db.user.findUnique({
        where: { username: username },
      });

      // If the email or username already exists, throw a GraphQLError
      if (emailExists || usernameExists) {
        throw new GraphQLError("Email or username already exists!", {
          extensions: { code: BAD_USER_INPUT_CODE }, // This code indicates a bad user input
        });
      }

      // Create the user
      const user = await db.user.create({
        data: {
          firstName,
          lastName,
          email,
          username,
          password: hashedPassword,
        },
      });

      // Create the company
      const company = await db.company.create({
        data: {
          name: companyName,
          url: companyURL,
        },
      });

      // Add the user as admin to the company
      await db.userInCompany.create({
        data: {
          user: { connect: { id: user.id } },
          company: { connect: { id: company.id } },
          role: "Admin",
        },
      });

      return user;
    },

    /**
     * Resolver function for user login.
     * Verifies the provided username and password against the database.
     * If the credentials are valid, generates a JWT token and returns it.
     * Throws an error if the username or password is incorrect.
     * @param {Object} _ - Unused argument (parent object).
     * @param {Object} args - Arguments containing the user DTO with username and password.
     * @returns {String} - JWT token if login is successful.
     * @throws {GraphQLError} - Throws an error if the username or password is incorrect.
     */
    LoginUser: async (_, args) => {
      // Extract username and password from the user DTO
      const { username, password } = args.userDto;
      // Find the user in the database based on the provided username
      const user = await db.user.findUnique({
        where: { username },
      });
      // Error message for incorrect username or password
      const errorMsg = "Username or password incorrect.";
      // Throw error if user does not exist (invalid username)
      if (!user) {
        throw new GraphQLError(errorMsg, {
          extensions: { code: BAD_USER_INPUT_CODE },
        });
      }
      // Compare the provided password with the hashed password stored in the database
      const matchPassword = await bcrypt.compareSync(password, user.password);
      // Throw error if passwords do not match (invalid password)
      if (!matchPassword)
        throw new GraphQLError(errorMsg, {
          extensions: { code: BAD_USER_INPUT_CODE },
        });
      // Generate JWT token with user ID payload
      const token = jwt.sign({ id: user.id }, envs.JWT_SECRET, {
        expiresIn: "30d",
      });
      // Return the JWT token
      return token;
    },
  },
};

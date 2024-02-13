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

      const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    LoginUser: async (_, args) => {
      const { username, password } = args.userDto;

      const user = await db.user.findUnique({
        where: { username },
      });

      const matchPassword = await bcrypt.compareSync(password, user.password);

      if (!matchPassword)
        throw new GraphQLError("The password is incorrect!", {
          extensions: { code: BAD_USER_INPUT_CODE },
        });

      const token = jwt.sign({ id: user.id }, envs.JWT_SECRET, {
        expiresIn: "30d",
      });

      return token;
    },
  },
};

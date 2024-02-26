import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { db } from "../../db/index.js";
import { FORBIDDEN_ERROR_CODE, NOT_FOUND_CODE } from "../error-codes.js";
import { saltRounds } from "../../config/saltRounds.js";
import { generateRandomPassword } from "../../utils/generate-random-password.js";
import { generateRandomUsername } from "../../utils/generate-random-username.js";

export const companyResolvers = {
  Company: {
    role: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const userCompany = await db.userInCompany.findFirstOrThrow({
          where: { userId: context.user.id },
        });

        return userCompany.role;
      } catch (error) {
        return null;
      }
    },

    users: async (company, _, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const users = await db.userInCompany.findMany({
        where: { companyId: company.id },
      });

      return users;
    },

    shifts: async (company, _, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const shifts = await db.shift.findMany({
        where: { companyId: company.id },
      });

      return shifts;
    },
  },

  UserInCompany: {
    user: async (userInCompany) => {
      const user = await db.user.findUnique({
        where: { id: userInCompany.userId },
      });

      return user;
    },
  },

  Query: {
    GetCompany: async (_, args, context) => {
      if (!context.isCompanyMember)
        throw new GraphQLError("You must be a member of the company!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const company = await db.company.findUnique({
        where: { url: args.companyUrl },
      });

      if (!company)
        throw new GraphQLError("Company not found!", {
          extensions: { code: NOT_FOUND_CODE },
        });

      return company;
    },
  },

  Mutation: {
    Company_AddEmployee: async (_, args, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const {
        firstName,
        lastName,
        birthDate,
        gender,
        startingDate,
        position,
        city,
        state,
        zip,
        address,
        email,
        telephone,
        paymentPerHour,
        userImageUrl,
        userImageId,
        employeeColor,
      } = args.employeeDto;

      const password = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const username = await generateRandomUsername(
        args.companyId,
        firstName,
        lastName
      );

      const user = await db.user.create({
        data: {
          firstName,
          lastName,
          email,
          username,
          password: hashedPassword,
          userImageId,
          userImageUrl,
        },
      });

      // TODO: Send email to new employee
      // email.send(email, password);

      // Add the user as employee to the company
      const employee = await db.userInCompany.create({
        data: {
          user: { connect: { id: user.id } },
          company: { connect: { id: args.companyId } },
          role: "Employee",
          birthDate,
          gender,
          startingDate,
          position,
          city,
          state,
          zip,
          address,
          telephone,
          paymentPerHour,
          employeeColor,
        },
      });

      return employee;
    },

    Company_AddClient: async (_, args, context) => {
      if (!context.isAdmin)
        throw new GraphQLError("You must be an admin!", {
          extensions: { code: FORBIDDEN_ERROR_CODE },
        });

      const { firstName, lastName, birthDate, gender, email, telephone } =
        args.clientDto;

      const password = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const username = await generateRandomUsername(
        args.companyId,
        firstName,
        lastName
      );

      console.log(username);

      const user = await db.user.create({
        data: {
          firstName,
          lastName,
          email,
          username,
          password: hashedPassword,
        },
      });

      // TODO: Send email to new client
      // email.send(email, password);

      // Add the user as employee to the company
      const client = await db.userInCompany.create({
        data: {
          user: { connect: { id: user.id } },
          company: { connect: { id: args.companyId } },
          role: "Client",
          birthDate,
          gender,
          telephone,
        },
      });

      return client;
    },
  },
};

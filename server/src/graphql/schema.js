import { gql } from "graphql-tag";
import {
  DateTimeTypeDefinition,
  DateTimeResolver,
  EmailAddressTypeDefinition,
  EmailAddressResolver,
} from "graphql-scalars";
import { userTypeDefs } from "./typeDefs/user.js";
import { companyTypeDefs } from "./typeDefs/company.js";
import { shiftTypeDefs } from "./typeDefs/shift.js";
import { appointmentTypeDefs } from "./typeDefs/appointment.js";

import { userResolvers } from "./resolvers/user.js";
import { companyResolvers } from "./resolvers/company.js";

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  enum UserCompanyRole {
    Admin
    Employee
    Client
  }

  enum AppointmentStatus {
    Idle
    Started
    Finished
  }
`;

export const typeDefs = [
  rootTypeDefs,
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  userTypeDefs,
  companyTypeDefs,
  shiftTypeDefs,
  appointmentTypeDefs,
];
export const resolvers = [
  { DateTime: DateTimeResolver },
  { EmailAddress: EmailAddressResolver },
  userResolvers,
  companyResolvers,
];

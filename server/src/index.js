// Import necessary modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { corsOptions } from "./config/cors.js";
import { envs } from "./config/env.js";
import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { expressMiddleware } from "@apollo/server/express4";
import { getReqToken } from "./utils/get-req-token.js";
import { db } from "./db/index.js";
import { COMPANY_AUTH_ROUTES } from "./graphql/config.js";

const app = express(); // Create an instance of the Express application.

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Start the server
app.listen(envs.PORT, () => {
  console.log(`🚀 Server on port ${envs.PORT}`);
});

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/gql",
    express.json(),
    cors(corsOptions),
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = getReqToken(req);

        if (
          !token ||
          token.startsWith("null") ||
          token.startsWith("undefined")
        ) {
          return {
            req,
            user: null,
          };
        }

        const data = jwt.verify(token, envs.JWT_SECRET);
        const user = await db.user.findUnique({ where: { id: data.id } });

        let isAdmin = false;
        let company = null;

        if (COMPANY_AUTH_ROUTES.includes(req.body.operationName) && user) {
          const { companyId } = req.body.variables;

          try {
            if (companyId) {
              const companyCtx = await db.company.findFirstOrThrow({
                where: {
                  id: companyId,
                  users: {
                    some: {
                      userId: user.id,
                      role: "Admin",
                    },
                  },
                },
              });

              if (companyCtx) {
                isAdmin = true;
                company = companyCtx;
              }
            }
          } catch (error) {
            isAdmin = false;
            company = null;
          }
        }

        return { req, user, isAdmin, company };
      },
    })
  );
};

(async () => {
  main();
})();

/**
 * REFERENCES:
 * https://www.apollographql.com/docs/apollo-server/data/context
 */

import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "../graphql/resolvers/index";
import { GraphQLContext } from "../types/types";
import { registerAuthDirective } from "../graphql/directives/auth";
import { decodeJwtFromRequest } from "./jwt";
import prisma from "./client";
import typeDefs from "../graphql/typedefs";

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// register auth directive
schema = registerAuthDirective(schema);

export const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    async context({ req }): Promise<GraphQLContext> {
        const user = decodeJwtFromRequest(req);

        return { prisma, user };
    },
    plugins: [],
});

export const testServer = (context: Partial<GraphQLContext>) =>
    new ApolloServer<GraphQLContext>({
        schema,
        context: { prisma, ...context },
    });

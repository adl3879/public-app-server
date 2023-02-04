import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";
import { DirectiveNames } from "./index";
import { GraphQLContext } from "../../types/types";
import { AuthDirectiveArgs } from "../../__generated__/resolvers-types";

export function registerAuthDirective(schema: GraphQLSchema) {
    return mapSchema(schema, {
        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            // Check whether this field has the specified directive
            const authDirective = getDirective(
                schema,
                fieldConfig,
                DirectiveNames.Auth
            )?.[0] as AuthDirectiveArgs;

            if (authDirective) {
                const { resolve } = fieldConfig;

                if (!resolve) {
                    return fieldConfig;
                }

                // Replace the original resolver so we can put in our custom directive logic, then call
                // the original resolver
                fieldConfig.resolve = async function (
                    source,
                    args,
                    ctx: GraphQLContext,
                    info
                ) {
                    // Check if user is logged in
                    if (ctx.user === null) {
                        throw new Error("Not authenticated");
                    }

                    const hasRole = authDirective.allows?.some((role) => {
                        return ctx.user?.roles.includes(role!);
                    });
                    if (!hasRole) {
                        throw new Error("Not authorized");
                    }

                    return resolve(source, args, ctx, info);
                };

                return fieldConfig;
            }
        },
    });
}

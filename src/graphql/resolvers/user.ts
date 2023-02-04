import { GraphQLContext } from "../../types/types";
import {
    UserResolvers,
    ResolversParentTypes,
    MutationCreateUserArgs,
    MutationLoginUserArgs,
    Role,
    MutationUpdateRoleArgs,
} from "../../__generated__/resolvers-types";
import { Secret, sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { validateCreateUserArgs } from "../../validations/user";

const userResolvers: UserResolvers = {
    Mutation: {
        async createUser(
            _parent: ResolversParentTypes,
            args: MutationCreateUserArgs,
            ctx: GraphQLContext
        ) {
            validateCreateUserArgs(args);

            const userExists = await ctx.prisma.user.findUnique({
                where: { email: args.email },
            });
            if (userExists) {
                throw new Error("User already exists");
            }

            const hashedPassword = await hash(args.password!, 10);

            const user = await ctx.prisma.user.create({
                data: {
                    email: args.email!,
                    password: hashedPassword,
                    roles: args.roles as Role[],
                },
            });

            const token = sign(user, process.env.JWT_SECRET as Secret, {
                expiresIn: "7d",
            });

            return { success: true, token };
        },

        async loginUser(
            _parent: ResolversParentTypes,
            args: MutationLoginUserArgs,
            ctx: GraphQLContext
        ) {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email: args.email!,
                },
            });
            if (!user) {
                throw new Error("User does not exist");
            }

            const valid = await compare(args.password!, user.password);
            if (!valid) {
                throw new Error("Invalid password");
            }

            const token = sign(user, process.env.JWT_SECRET as Secret, {
                expiresIn: "7d",
            });

            return { success: true, token };
        },

        async updateRole(
            _parent: ResolversParentTypes,
            args: MutationUpdateRoleArgs,
            ctx: GraphQLContext
        ) {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email: args.email,
                },
            });
            const updatedRoles = new Set([...user!.roles, ...args.roles]);

            await ctx.prisma.user.update({
                where: {
                    email: args.email,
                },
                data: {
                    roles: Array.from(updatedRoles),
                },
            });
            return true;
        },
    },

    Query: {
        async searchUsers(
            _parent: ResolversParentTypes,
            _args: any,
            ctx: GraphQLContext
        ) {
            return await ctx.prisma.user.findMany();
        },
    },
    // Subscription: {},
};

export default userResolvers;

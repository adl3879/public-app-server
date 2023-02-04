import { testServer } from "../../utils/server";
import {
    MutationCreateUserArgs,
    MutationLoginUserArgs,
    MutationUpdateRoleArgs,
    Role,
} from "../../__generated__/resolvers-types";
import prisma from "../../utils/client";

const CREATE_USER = `#graphql
  mutation createUser($email: String, $password: String, $roles: [Role]) {
    createUser(email: $email, password: $password, roles: $roles) {
      success
      token
    }
  }
`;

let user = null;

describe("Users", () => {
    beforeAll(async () => {
        // create user
        user = await testServer({}).executeOperation({
            query: CREATE_USER,
            variables: {
                email: "test_user@example.com",
                password: "2u1891WIN!9000",
                roles: ["ADMIN", "USER"] as Role[],
            } as MutationCreateUserArgs,
        });
    });

    afterAll(async () => {
        const deleteUser = prisma.user.deleteMany();

        await prisma.$transaction([deleteUser]);
        await prisma.$disconnect();
    });

    it("should test is test server is working", async () => {
        expect(true).toBeTruthy();
    });

    it("should sign up user successfully", async () => {
        const response = await testServer({}).executeOperation({
            query: CREATE_USER,
            variables: {
                email: "test_user2000@example.com",
                password: "2u1891WIwwwN!9000",
                roles: ["ADMIN", "USER"] as Role[],
            } as MutationCreateUserArgs,
        });

        expect(response.errors).toBeUndefined();
    });

    it("should validate user input", async () => {
        const response = await testServer({}).executeOperation({
            query: CREATE_USER,
            variables: {
                email: "test@live.com",
                password: "qqqq",
                roles: ["ADMIN", "USER"] as Role[],
            } as MutationCreateUserArgs,
        });

        expect(response.errors).toBeDefined();
    });

    it("should log in user successfully", async () => {
        const response = await testServer({}).executeOperation({
            query: `#graphql
        mutation LoginUser($email: String, $password: String) {
          loginUser(email: $email, password: $password) {
            success
            token
          }
        }
      `,
            variables: {
                email: "test_user@example.com",
                password: "2u1891WIN!9000",
            } as MutationLoginUserArgs,
        });

        expect(response.errors).toBeUndefined();
        expect(response.data?.loginUser.success).toBeTruthy();
    });

    it("updates role successfully", async () => {
        const response = await testServer({}).executeOperation({
            query: `#graphql
        mutation UpdateRole($email: String, $roles: [Role]) {
          updateRole(email: $email, roles: $roles)
        }
      `,
            variables: {
                email: "test_user@example.com",
                roles: ["ADMIN", "USER"] as Role[],
            } as MutationUpdateRoleArgs,
        });

        expect(response.errors).toBeUndefined();
        expect(response.data?.updateRole).toBeTruthy();
    });
});

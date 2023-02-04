import { z } from "zod";
import { MutationCreateUserArgs } from "../__generated__/resolvers-types";

export const validateCreateUserArgs = (args: MutationCreateUserArgs) =>
    z
        .object({
            email: z.string().email("Invalid email"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .regex(
                    /[a-z]/,
                    "Password must contain at least one lowercase letter"
                )
                .regex(
                    /[A-Z]/,
                    "Password must contain at least one uppercase letter"
                )
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(
                    /[!@#$%^&*]/,
                    "Password must contain at least one special character"
                ),
        })
        .parse(args);

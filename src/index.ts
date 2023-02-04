import express from "express";
import cors from "cors";
import { server } from "./utils/server";
import dotenv from "dotenv";

dotenv.config();

export async function main() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    await server.start();
    server.applyMiddleware({ app });

    await new Promise<void>((resolve) =>
        app.listen({ port: process.env.PORT }, resolve)
    );
    console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
}

main().catch((err) => console.log(err));

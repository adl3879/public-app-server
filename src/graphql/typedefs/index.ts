import { readFileSync } from "fs";
import path from "path";

const files = ["user", "schema"];
let typeDefs: string = "";

for (let file of files) {
    typeDefs =
        typeDefs +
        "\n" +
        readFileSync(path.join(__dirname, `${file}.graphql`), {
            encoding: "utf-8",
        });
}

export default typeDefs;

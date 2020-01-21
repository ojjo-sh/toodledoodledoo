import config from "../config";

export default {
    database: config.database.database || "toodledoodledoo",
    queries: [
        `CREATE TABLE todos(
            id SERIAL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            completed BOOL NOT NULL DEFAULT FALSE    
        );`,
        "INSERT INTO todos (name) VALUES ('Test todo 1');",
        "INSERT INTO todos (name) VALUES ('Test todo 2');",
        "INSERT INTO todos (name) VALUES ('Test todo 3');",
    ]
}

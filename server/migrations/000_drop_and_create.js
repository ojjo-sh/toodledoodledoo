import config from "../config";

const { database } = config.database;

export default {
    database: "postgres",
    queries: [
        `DROP DATABASE IF EXISTS ${database};`,
        `CREATE DATABASE ${database};`
    ]
}

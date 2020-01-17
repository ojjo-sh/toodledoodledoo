import path from "path";
import fs, { readdirSync } from "fs";
import pg from "pg";
import config from "./config";

const pool = new pg.Pool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: "postgres"
});

const directory = path.join(__dirname, '/migrations');
const files = fs.readdirSync(directory).sort();

console.log("Migrating...........");

Promise.all(files.map(file => {
    return fs.readFileSync(path.join(directory, file), "utf8");
}))
.then(async queries => {
    return new Promise(async (resolve, reject) => {
        for(let idx = 0, length = queries.length; idx < length; idx++){
           try {
               const query = queries[idx];
               await pool.query(query);
           } catch (error) {
               reject(error);
               break;
           }
        }
        resolve(true);
    })
}).then(async () => {
   await pool.end();
   console.log("Migration complete!");
   process.exit();
}).catch((error) => {
   console.error('error occured while running migration', error)
   process.exit();
});

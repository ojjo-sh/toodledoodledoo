import path from "path";
import fs from "fs";
import pg from "pg";
import config from "./config";

const directory = path.join(__dirname, "/migrations");
const files = fs.readdirSync(directory).sort();

;(async function() {
    try {
        console.log("Migrating...........");
        for (let i = 0; i < files.length; i++) {
            const {
                queries,
                database,
            } = require(`./migrations/${files[i]}`).default;

            const pool = new pg.Pool({
                ...config.database,
                database
            });

            for (const q of queries) {
                try {
                    const client = await pool.connect();
                    await client.query(q.trim());
                    client.release();
                } catch (err) {
                    console.error(err);
                }
            }

            await pool.end();
        }
        console.log("Migration complete!");
    } catch(err) {
        console.error(err);
        process.exit();
    }
})();
import path from "path";
import fs from "fs";
import pg from "pg";
import config from "./config";

const directory = path.join(__dirname, "/migrations");
const files = fs.readdirSync(directory).sort();

async function query(queries, pool, file) {
    return new Promise(async (resolve, reject) => {
        if (!queries || !Array.isArray(queries)) {
            throw new Error(`Queries invalid for ${file ? file : "migration"}.`)
        }

        let client;

        try {
            for (const q of queries) {
                client = await pool.connect();
                await client.query(q.trim());
                client.release();
            }

            resolve(true);
        } catch (err) {
            if (
                client
                && typeof client.release === "function"
            ) {
                client.release();
            }

            reject(err);
        }
    });
}

;(async function() {
    try {
        console.log("Migrating...........");

        let previous, pool;
        for (let i = 0; i < files.length; i++) {
            const migration = require(`./migrations/${files[i]}`).default;

            if (!migration || !migration.database || !migration.queries) {
                throw new Error(`Error parsing migration: ${files[i]}`);
            }

            const { queries, database } = migration;

            if (
                !previous
                || database !== previous.database
            ) {
                if (pool) await pool.end();

                pool = new pg.Pool({
                    ...config.database,
                    database
                });
            }

            await query(queries, pool, files[i]);

            if ( i === files.length - 1) {
                await pool.end();
            } else {
                previous = migration;
            }
        }

        console.log("Migration complete!");
    } catch(err) {
        console.error(err);
        process.exit();
    }
})();

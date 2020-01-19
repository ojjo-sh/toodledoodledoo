import path from "path";
import fs from "fs";
import pg from "pg";
import config from "./config";

const directory = path.join(__dirname, "/migrations");
const files = fs.readdirSync(directory).sort();

async function query(queries, pool) {
    if (!queries || !Array.isArray(queries) || !pool) return false;

    let client;

    return new Promise(async (resolve, reject) => {
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
                && typeof client.release === 'function'
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
        for (let i = 0; i < files.length; i++) {
            const {
                queries,
                database,
            } = require(`./migrations/${files[i]}`).default;

            const pool = new pg.Pool({
                ...config.database,
                database
            });

            await query(queries, pool);
            await pool.end();
        }
        console.log("Migration complete!");
    } catch(err) {
        console.error(err);
        process.exit();
    }
})();

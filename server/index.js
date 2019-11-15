import express from 'express';
import pg from 'pg';
import { reverse } from 'dns';

const Client = pg.Client;

const app = express();
const port = 3000;

const apiPrefix = "todoodles";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'toodledoodledoo',
    password: 'docker',
    port: 5432,
});

// Returns all todos
app.get(`/${apiPrefix}`, async (req, res) => {
    try {
        await client.connect();

        client
            .query("SELECT * FROM todos")
            .then(res => console.log(res.rows))
            .catch(e => console.error(e));


        await client.end()
    } catch(err) {
        console.error(err);
    };
});


// Returns single todo
app.get(`/${apiPrefix}/:id`);

// Creates single todo
app.post(`/${apiPrefix}`);

// Updates single todo
app.put(`/${apiPrefix}/:id`);

// Deletes single todo
app.delete(`${apiPrefix}/:id`);



app.listen(port, () => console.log(`Listening on port ${port}`));
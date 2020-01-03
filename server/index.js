import express from 'express';
import pg from 'pg';
import toml from 'toml';
import fs from 'fs';
import bodyParser from 'body-parser';
import { reverse } from 'dns';

const config = toml.parse(fs.readFileSync('../config/dev.toml', 'utf-8'));

const app = express();
const serverPort = config.server.port;
const apiPrefix = "api";

const pool = new pg.Pool(config.database);

// Middleware
app.use(bodyParser.json());

// Returns all todos
app.get('/', (_, res) => {

  res.status(200).json({ "hello": "world" });
});

/**
 * GET all TODOs. 
 */

app.get(`/${apiPrefix}/todos`, async (req, res) => {
  pool.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      throw err;
    }

    console.log(result.rows);
    res.status(200).json(result.rows);
  });   
});

/**
 * GET a specific todo by ID.
 */

app.get(`/${apiPrefix}/todos/:id`, async (req, res) => {
  const id = Number(req.params.id);

  if (!isNaN(id) && id > 0) {
    pool.query('SELECT * FROM todos WHERE id = $1', [id], (err, result) => {
      if (err) {
        throw err;
      }

      console.log(result.rows);
      res.status(200).json(result.rows);
    });   
  }
});

/**
 * INSERT new Todoodledoo into database.
 */

app.post(`/${apiPrefix}/todos`, (req, res) => {
  let name;

  if (req && req.body && req.body.name) {
    name = req.body.name;
    console.log(name);
  }

  pool.query('INSERT INTO todos (name, completed) VALUES ($1, $2)', [name, false], (err, result) => {

    if (err) {
      console.log("Uh oH!", err);
    } else {
      console.log("Success", result);
    }
    
  }) 
  // pool.query('INSERT INTO todos (name, completed) VALUES ($1, $2)', [name, completed], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(201).send(`User added with ID: ${result.insertId}`)
});



app.delete(`/${apiPrefix}/todos/:id`, async (req, res) => {

  const id = Number(req.params.id);

  if (!isNaN(id) && id > 0) {
    pool.query('DELETE FROM todos WHERE id = $1;', [id], (err, result) => {
      if (err) {
        console.log("Uh oH!", err);
      } else {
        console.log("Success", result);
      }
    })
  }
});

app.listen(serverPort, () => {
  console.log(`
    Hello! The server is running!
  `);
});

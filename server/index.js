import express from 'express';
import pg from 'pg';
import toml from 'toml';
import fs from 'fs';
import { reverse } from 'dns';

const app = express();
const serverPort = 3000;

const config = toml.parse(fs.readFileSync('../config/dev.toml', 'utf-8'));

const  {
    database,
    user,
    port,
    password,
    host,
} = config.database;

const apiPrefix = "toodoodles";

const pool = new pg.Pool({
    user, 
    host, 
    database, 
    password,
    port,
});

// Returns all todos
app.get(`/${apiPrefix}`, async (req, res) => {
    res.send("hello")
});

app.post("/make-new-todo", (req, res) => {
  const { name } = req.body

  pool.query('INSERT INTO todos (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

app.post(`/${apiPrefix}`, async (req, res) => {
    res.send("hello")
});

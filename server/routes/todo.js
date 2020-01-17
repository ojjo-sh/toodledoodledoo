import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.database);

export default function (router) {

    /**
     * Returns all of the todos from the database.
     */
    router.get("/todos", async (req, res) => {
        pool.query('SELECT * FROM todos', (err, result) => {
            if (err) {
                throw err;
            }

            console.log(result.rows);
            res.status(200).json(result.rows);
        });
    });

    /**
     * Returns a todo from the database by ID.
     */

    router.get(`/todos/:id`, async (req, res) => {
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
     * Inserts a Todo into the database. The database should set completed to false 
     * if there is no argument passed.
     */

    router.post(`/todos`, (req, res) => {

        // The name of the todo
        let name;

        // Check to see if the request contains a valid todo name.
        if (req && req.body && req.body.name) {
            name = req.body.name;
        } else {
            return res.status(400).send("Name was null.");
        }

        // Do database insertion.
        pool.query('INSERT INTO todos (name, completed) VALUES ($1, $2)', [name, false], (err, result) => {
            if (err) {
                console.log("Error inserting todo: ", err);
                return res.status(400).send("Error creating todo");
            } else {
                console.log("Successfully added a new todo!", result);
                return res.status(200).send("Created todo");
            }
        })
        // pool.query('INSERT INTO todos (name, completed) VALUES ($1, $2)', [name, completed], (error, results) => {
        //   if (error) {
        //     throw error
        //   }
        //   response.status(201).send(`User added with ID: ${result.insertId}`)
    });

    /**
     * Deletes a todo from the database by ID.
     */
    router.delete(`/todos/:id`, async (req, res) => {
        const id = Number(req.params.id);

        if (!isNaN(id) && id > 0) {
            pool.query('DELETE FROM todos WHERE id = $1;', [id], (err, result) => {
                if (err) {
                    console.log("Error deleting todo: ", err);
                } else {
                    console.log("Sucessfully deleted todo!", result);
                }
            })
        }
    });
}
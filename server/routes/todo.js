import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.database);

export default function (router) {

    /**
     * Returns all of the todos from the database.
     */
    router.get("/todos", async (req, res) => {

        const query = "SELECT * FROM todos";

        try {
            const result = await pool.query(query);
            res.status(200).json(result.rows);
        } catch (error) {
            console.log("Error returning all todos: ", error);
            return res.status(400).send("Error getting all todos.");
        }
    });

    /**
     * Returns a todo from the database by ID.
     */

    router.get(`/todos/:id`, async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id) && id > 0) {

            const query = "SELECT * FROM todos WHERE id = $1";

            try {
                const result = await pool.query(query, [id]);
                res.status(200).json(result.rows);
            } catch (error) {
                console.log(`Error returning todo of ID ${id}: `, error);
                return res.status(400).send(`Error returning todo of ID ${id}`);
            }
        } else {
            res.status(400).send(`Error returning todo of ID ${id}. Either NaN or negative.`);
        }
    });

    /**
     * Inserts a Todo into the database. The database should set completed to false 
     * if there is no argument passed.
     */
    router.post(`/todos`, async (req, res) => {

        // The name of the todo
        let name;

        // Check to see if the request contains a valid todo name.
        if (req && req.body && req.body.name) {
            name = req.body.name;
        } else {
            console.log(`Error with request body: ${JSON.stringify(req.body)}`);
            return res.status(400).send("Error creating todo. Name was null.");
        }

        // Insert command
        const query = "INSERT INTO todos (name, completed) VALUES ($1, $2)";

        // Do database insertion.
        try {
            const result = await pool.query(query, [name, false]);

            console.log(`Created todo: ${name}`);
            return res.status(200).send(`Sucessfully created todo "${name}"`);
        } catch (error) {
            console.log("Error creating todo: ", error);
            return res.status(400).send(`Error creating todo "${name}"`);
        }
    });

    /**
     * Deletes a todo from the database by ID.
     */
    router.delete(`/todos/:id`, async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id) && id > 0) {

            const query = "DELETE FROM todos WHERE id = $1;";

            try {
                const result = await pool.query(query, [id]);
                console.log(`Deleted todo: ${id}`);
                return res.status(200).send(`Sucessfully deleted todo of ID ${id}`);
            } catch (error) {
                console.log(`Error deleting todo of ID ${id}`, error);
                return res.status(400).send(`Error deleting todo of ID ${id}`);
            }
        } else {
            console.log(`Error deleting todo of ID ${id}. Either NaN, or an invalid number (0 or negative)`)
            return res.status(400).send(`Error deleting todo of ID ${id}. Either NaN or negative.`);
        }
    });
}

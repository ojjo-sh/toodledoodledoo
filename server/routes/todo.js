import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.database);

export default function (router) {

    /**
     * Returns all of the todos from the database.
     */
    router.get("/todos", async (req, res) => {

        const selectAllCommand = "SELECT * FROM todos";

        try {
            const result = await pool.query(selectAllCommand);
            console.log(result.rows);
            res.status(200).json(result.rows);
        } catch (error) {
            console.log(error);
            return res.status(400).send("Error getting all todos");
        }
    });

    /**
     * Returns a todo from the database by ID.
     */

    router.get(`/todos/:id`, async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id) && id > 0) {

            const selectIdCommand = "SELECT * FROM todos WHERE id = $1";

            try {
                const result = await pool.query(selectIdCommand, [id]);
                console.log(result.rows);
                res.status(200).json(result.rows);
            } catch (error) {
                console.log(error);
                return res.status(400).send("Error getting todo.");
            }
        } else {
            res.status(400).send("ID was either not a number, or negative.");
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
            return res.status(400).send("Name was null.");
        }

        // Insert command
        const insertCommand = "INSERT INTO todos (name, completed) VALUES ($1, $2)";

        // Do database insertion.
        try {
            const result = await pool.query(insertCommand, [name, false]);
            console.log("Successfully added a new todo!", result);
            return res.status(200).send("Created todo");
        } catch (error) {
            console.log(error);
            return res.status(400).send("Error creating todo");
        }
    });

    /**
     * Deletes a todo from the database by ID.
     */
    router.delete(`/todos/:id`, async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id) && id > 0) {

            const deleteCommand = "DELETE FROM todos WHERE id = $1;";

            try {
                const result = await pool.query(deleteCommand, [id]);
                console.log("Sucessfully deleted todo!", result);
            } catch (error) {
                console.log(error);
                return res.status(400).send("Error deleting todo.");
            }
        } else {
            return res.status(400).send("Error deleting todo. ID is NaN or negative.");
        }
    });
}
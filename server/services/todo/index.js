import db from "../../db";
import validate from "./validation";

export function findById({ id }) {
  const query = "SELECT * FROM todos WHERE id = $1";

  return new Promise(async (resolve, reject) => {
    try {
      // Esnures ID is valid
      validate.id(id);

      // Query the DB and validate the result set
      const result = await db.query(query, [id]);
      validate.rows(result.rows);

      // Returns first record
      resolve(result.rows[0]);
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteTodoById({ id }) {
  /**
   * Make use of findByID
   */
}

export function updateTodoById({ id }) {
  /**
   * Check to see if todo exitst first, use findById
   */
}

export function fetchAll() {
  const query = "SELECT * FROM todos";
  
  return new Promsise(async (resolve, reject) => {
    try {
      const result = await db.query(query);
      validate.rows(result.rows);

      resolve(result.rows[0]);
    } catch (err) {
      reject(err);
    }
  })
}

export function createTodo() {}

export default {
  findById,
  fetchAll,
}
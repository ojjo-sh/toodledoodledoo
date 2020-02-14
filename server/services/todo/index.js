import db from "../../db";

export function findById({ id }) {
  const query = "SELECT * FROM todos WHERE id = $1";

  return new Promise(async (resolve, reject) => {
    try {
      resolve(await db.query(query, [id]));
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

export function fetchTodos() {}

export function createTodo() {}

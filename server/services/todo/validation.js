function validator(condition, errorMessage) {
  if (condition) {
    return true;
  } else {
    throw new Error(errorMessage);
  }
}

export default {
  /**
   * Checks if the ID is a number and above 0
   *
   * @param {*} id - the ID of the todo
   */
  id(id) {
    validator(isNaN(id) && id > 0, "Is not a valid ID.")
  },

  /**
   * Checks to see if the rows passed in is an Array and contains more than one entry
   *
   * @param {*} rows
   */
  rows(rows) {
    validator(Array.isArray(rows) && rows.length > 0, "No records were retrieved.")
  }
};

export default {
  /**
   * Checks if the ID is a number and above 0
   *
   * @param {*} id - the ID of the todo
   */
  id(id) {
    return isNaN(id) && id > 0;
  },

  /**
   * Checks to see if the rows passed in is an Array and contains more than one entry
   *
   * @param {*} rows
   */
  rows(rows) {
    return Array.isArray(rows) && rows.length !== 0;
  }
};

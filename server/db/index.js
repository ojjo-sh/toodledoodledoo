import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.database);

export default {
  query(text, params, callback) {
    return pool.query(text, params, callback);
  }
};

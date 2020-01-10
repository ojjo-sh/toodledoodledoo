import toml from 'toml';
import fs from 'fs';
import { doesFileExist } from "../utils/index.js";

const config = doesFileExist(`${__dirname}/dev.toml`)
    ? toml.parse(fs.readFileSync(`${__dirname}/dev.toml`, 'utf-8'))
    : toml.parse(fs.readFileSync(`${__dirname}/default.toml`, 'utf-8'));

export default config;
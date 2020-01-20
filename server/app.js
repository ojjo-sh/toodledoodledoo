import express from 'express';
import toml from 'toml';
import fs from 'fs';
import { doesFileExist } from './utils';
import bodyParser from 'body-parser';
import { reverse } from 'dns';
import router from "./routes";
import config from './config';


const app = express();
const serverPort = config.server.port;

// Middleware
app.use(bodyParser.json());
app.use("/api", router);


export default app;

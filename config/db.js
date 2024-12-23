import dotenv from 'dotenv';
dotenv.config();

import knex from 'knex';
import dbConn from './db.config.js';

const environment = process.env.NODE_ENV || 'development'; // Defaults to 'development' if NODE_ENV is not set
const config = dbConn.dbConn[environment];
if (!config) {
    throw new Error(`Database configuration for  environment is not defined.`);
}
const db = knex(config);

export default db;


import { Pool } from 'pg';

const {DATABASE_URL} = process.env
const pool = new Pool({DATABASE_URL});

module.exports = { pool };
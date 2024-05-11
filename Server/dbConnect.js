import pg from "pg";
import env from "dotenv"

env.config();

const db = new pg.Client({
    user: process.env.PGUSER,
	host: process.env.HOST,
    database: process.env.DATABASE,
	password: process.env.PASSWORD,
    port: process.env.PGPORT,
});

db.connect();

export default db;
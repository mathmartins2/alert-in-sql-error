import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;

const minutes = 30;
const milliseconds = minutes * 60 * 1000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

async function runQuery() {
  try {
    await pool.query('SELECT now()');
  } catch (err) {
    await sendDiscordMessage('banco de dados is down AGR FERROU TD @everyone')
    await fs.appendFileSync('error.log', JSON.stringify(err));
  } finally {
    await pool.end();
  }
}

const sendDiscordMessage = async (message) => {
  await axios.post(process.env.DISCORD_URL, {
    username: 'LULA CAMARADA',
    content: message
  });
};

setInterval(async () => {
  await runQuery();
}, milliseconds)
runQuery();
import db from 'mysql2-async/db'
import dotenv from 'dotenv';

dotenv.config({ path: new URL(import.meta.url + '/../../../../.env') });

export default db;
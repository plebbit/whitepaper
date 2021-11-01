import express from 'express';
import dotenv from 'dotenv';
import subplebbit from './routes/subplebbit.js';
import bodyParser from 'body-parser';

dotenv.config()
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/subplebbit', subplebbit);

app.listen(process.env.APP_PORT, () => {
    console.log(`app listening at http://localhost: `, process.env.APP_PORT);
});
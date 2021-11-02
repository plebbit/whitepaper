import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import subplebbit from './routes/subplebbit.js';
import post from './routes/post.js';
import comment from './routes/comment.js';

dotenv.config()
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/subplebbit', subplebbit);
app.use('/post', post);
app.use('/comment', comment);

app.listen(process.env.APP_PORT, () => {
    console.log(`app listening at`, process.env.APP_PORT);
});
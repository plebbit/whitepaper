import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUI from "swagger-ui-express";
import bodyParser from 'body-parser';
import subplebbit from './routes/subplebbit.js';
import post from './routes/post.js';
import comment from './routes/comment.js';
import YAML from 'yamljs';

dotenv.config()
const app = express();
const swaggerDocument = YAML.load('./docs.yaml');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/subplebbit', subplebbit);
app.use('/post', post);
app.use('/comment', comment);

var server = app.listen(process.env.APP_PORT, () => {
    console.log(`app listening at`, process.env.APP_PORT);
});

server.timeout = 10000000;
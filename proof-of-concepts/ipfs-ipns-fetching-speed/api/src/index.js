import YAML from 'yamljs';
import cron from 'node-cron';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUI from "swagger-ui-express";
import bodyParser from 'body-parser';
import subplebbit from './routes/subplebbit.js';
import post from './routes/post.js';
import comment from './routes/comment.js';
import gateway from './routes/gateway.js';
import publishComments from './scripts/publishComments.js';
import publishPosts from './scripts/publishPosts.js';

dotenv.config({ path: new URL(import.meta.url + '/../../../.env') });
const app = express();
const swaggerDocument = YAML.load('./docs.yaml');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

cron.schedule('30 * * * *', async () => {
    await publishComments();
});

cron.schedule('0 * * * *', async () => {
    await publishPosts();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/subplebbit', subplebbit);
app.use('/post', post);
app.use('/comment', comment);
app.use('/gateway', gateway);

var server = app.listen(process.env.API_PORT, () => {
    console.log(`app listening at`, process.env.API_PORT);
});

server.timeout = 10000000;
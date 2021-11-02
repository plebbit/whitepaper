import ipfs from '../config/ipfs.js';
import db from '../config/db.js';
import axios from 'axios';
import cron from 'node-cron';

cron.schedule('0 * * * *', async () => {
    const postsToUpdate = await db.query(`SELECT DISTINCT record FROM comments`);
    const comments = await db.query(`SELECT * FROM comments ORDER BY id DESC`);

    for (const postToUpdate of postsToUpdate) {
        const postData = (await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + postToUpdate.record)).data;
        const commentByPost = await comments.filter(element => element.record == postToUpdate.record);
        const newLatestCommentsCID = await commentByPost.map(element => element.CID);

        postData.comments = postData.posts.concat(newLatestCommentsCID);
        postData.latestPost = commentByPost[0].CID;
        let { cid } = await ipfs.add(JSON.stringify(postData));
        await ipfs.name.publish('/ipfs/' + cid, { key: commentByPost[0].key_title });
    }
    await db.query(`DELETE FROM comments`);
});
import ipfs from '../config/ipfs.js';
import db from '../config/db.js';
import axios from 'axios';
import cron from 'node-cron';

cron.schedule('0 * * * *', async () => {
    const subplebbitsToUpdate = await db.query(`SELECT DISTINCT record FROM posts`);
    const posts = await db.query(`SELECT * FROM posts ORDER BY id DESC`);

    for (const subplebbitToUpdate of subplebbitsToUpdate) {
        const subplebbitData = (await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbitToUpdate.record)).data;
        const postBySubplebbit = await posts.filter(element => element.record == subplebbitToUpdate.record);
        const newLatestPostsCID = await postBySubplebbit.map(element => element.CID);

        subplebbitData.posts = subplebbitData.posts.concat(newLatestPostsCID);
        const length = subplebbitData.posts.length;
        if (length > 100)
            subplebbitData.posts = subplebbitData.posts.splice(-(length - 100), (length - 100));
        subplebbitData.latestPost = postBySubplebbit[0].CID;
        let { cid } = await ipfs.add(JSON.stringify(subplebbitData));
        await ipfs.name.publish('/ipfs/' + cid, { key: postBySubplebbit[0].key_title });
    }
    await db.query(`DELETE FROM posts`);
});
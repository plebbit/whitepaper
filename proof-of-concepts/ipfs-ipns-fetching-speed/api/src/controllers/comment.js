import ipfs from '../config/ipfs.js';
import db from '../config/db.js';
import axios from 'axios';

const comment = {
    createComment: async (req, res) => {
        const content = req.body.content;
        const postCID = req.body.postCID;

        // Get the content of the IPFS containing the post
        const post = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + postCID);

        // Get the previous comment CID of the subplebbit
        let prev = await db.query(`SELECT * FROM comments WHERE key_title = ? ORDER BY id DESC LIMIT 1;`, [post.data.title]);
        if (prev.length != 0)
            prev = prev[0].CID;
        else {
            const postIPNS = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + post.data.latestComments);

            prev = postIPNS.data.latestComment;
        }

        // Create the IPFS storing the comment
        let newCommentCid = ((await ipfs.add(JSON.stringify(
            {
               content,
               prev,
            }
        ))).cid).toString();
        await db.query(`INSERT INTO comments (CID, record, key_title) VALUES (?, ?, ?)`, [newCommentCid, post.data.latestComments, post.data.title]);

        console.log(newCommentCid);
        res.json({ "CID": newCommentCid });
    }
}

export default comment;
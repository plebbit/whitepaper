import ipfs from '../config/ipfs.js';
import db from '../config/db.js';
import axios from 'axios';

const comment = {
    createComment: async (req, res) => {
        const content = req.body.content;
        const postCID = req.body.postCID;

        const post = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + postCID);

        let prev = await db.query(`SELECT * FROM comments WHERE key_title = ? ORDER BY id DESC LIMIT 1;`, [post.data.title]);

        if (prev.length != 0)
            prev = prev[0].CID;
        else
            prev = null;

        let newCommentCid = ((await ipfs.add(JSON.stringify(
            {
               title,
               content,
               upvote: 0,
               prev,
               latestComments: response.name
            }
        ))).cid).toString();

        await db.query(`INSERT INTO comments (CID, record, key_title) VALUES (?, ?, ?)`, [newCommentCid, post.data.latestComments, post.data.title]);

        console.log(newCommentCid);

        res.json({ newCommentCid });
    }
}

export default comment;
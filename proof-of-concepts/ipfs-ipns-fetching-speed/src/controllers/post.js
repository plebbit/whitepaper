import ipfs from '../config/ipfs.js';
import db from '../config/db.js';
import axios from 'axios';

const post = {
    createPost: async (req, res) => {
        let title = req.body.title;
        const content = req.body.content;
        const subplebbitCID = req.body.subplebbitCID;

        const subplebbit = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + subplebbitCID);
        title = subplebbit.data.title + '.' + title;

        let { cid } = await ipfs.add(JSON.stringify(
            {
                comments: [],
                latestComment: null
            }
        ));

        await ipfs.key.gen(title, { type: 'rsa', size: 2048 });

        let response = await ipfs.name.publish('/ipfs/' + cid, { key: title });

        let prev = await db.query(`SELECT * FROM posts WHERE key_title = ? ORDER BY id DESC LIMIT 1`, [subplebbit.data.title]);

        if (prev.length != 0)
            prev = prev[0].CID;
        else
            prev = null;

        let newPostCid = ((await ipfs.add(JSON.stringify(
            {
               title,
               content,
               upvote: 0,
               prev,
               latestComments: response.name
            }
        ))).cid).toString();

        await db.query(`INSERT INTO posts (CID, record, key_title) VALUES (?, ?, ?)`, [newPostCid, subplebbit.data.latestPosts, subplebbit.data.title]);

        console.log(newPostCid);

        res.json({ newPostCid });
    },
    getPostByCid: async (req, res) => {
        const CID = req.params.CID;
        const post = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + CID);
        const postLatestComments = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + post.data.latestComments);
        let latestPost = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + postLatestComments.data.latestComment);
        let postComments = [];

        while (latestPost.data.prev != null) {
            subplebbitPosts.push(latestPost.data);
            latestPost = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + latestPost.data.prev);
        }

        console.log({ "title": subplebbit.data.title, "content": subplebbit.data.content, "upvote": subplebbit.data.upvote, "comments": postComments });

        res.json({ "title": subplebbit.data.title, "content": subplebbit.data.content, "upvote": subplebbit.data.upvote, "comments": postComments });
    }
}

export default post;
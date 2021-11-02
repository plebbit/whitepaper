import ipfs from '../config/ipfs.js';
import axios from 'axios';

const subplebbit = {
    createSubplebbit: async (req, res) => {
        const title = req.body.title;
        const subplebbitListName = 'k2k4r8m9xwpw5kczi1c21ewml8829axha149dckia8r5g4pnxknh6qdb';
        const subplebbitList = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbitListName);

        let { cid } = await ipfs.add(JSON.stringify(
            {
                posts: [],
                latestPost: null
            }
        ));

        await ipfs.key.gen(title, { type: 'rsa', size: 2048 });

        let response = await ipfs.name.publish('/ipfs/' + cid, { key: title });

        let newSubplebbitCid = ((await ipfs.add(JSON.stringify(
            {
               title,
               latestPosts: response.name
            }
        ))).cid).toString();

        subplebbitList.data.subplebbits.push(newSubplebbitCid);

        cid = (await ipfs.add(JSON.stringify(subplebbitList.data))).cid;

        await ipfs.name.publish('/ipfs/' + cid, { key: "Plebbit" });

        console.log(newSubplebbitCid);

        res.json({ newSubplebbitCid });
    },
    getLatestSubplebbits: async (req, res) => {
        const subplebbitListName = 'k2k4r8m9xwpw5kczi1c21ewml8829axha149dckia8r5g4pnxknh6qdb';
        const subplebbitList = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbitListName);
        let amount = req.params.amount;
        let result = [];

        amount = amount > subplebbitList.data.subplebbits.length ? subplebbitList.data.subplebbits.length : amount;
        for (let i = 0; i < amount; ++i) {
            const subplebbit = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + subplebbitList.data.subplebbits[i]);
            const subplebbitLatestPosts = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbit.data.latestPosts);

            let subplebbitPosts = [];
            for (const y of subplebbitLatestPosts.data.posts) {
                const post = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + y);

                subplebbitPosts.push(post.data);
            }
            result.push({ "title": subplebbit.data.title, "posts": subplebbitPosts });
        }

        console.log(result);

        res.json(result);
    },
    getSubplebbitByCID: async (req, res) => {
        const CID = req.params.CID;
        const subplebbit = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + CID);
        const subplebbitLatestPosts = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbit.data.latestPosts);

        let subplebbitPosts = [];
        for (const y of subplebbitLatestPosts.data.posts) {
            const post = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + y);

            subplebbitPosts.push(post.data);
        }

        console.log({ "title": subplebbit.data.title, "posts": subplebbitPosts });

        res.json({ "title": subplebbit.data.title, "posts": subplebbitPosts });
    }
}

export default subplebbit;
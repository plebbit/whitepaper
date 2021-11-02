import ipfs from '../config/ipfs.js';
import axios from 'axios';

const subplebbit = {
    createSubplebbit: async (req, res) => {
        const title = req.body.title;

        // Get the content of the IPFS containing the subplebbit's list
        const subplebbitListName = 'k2k4r8m9xwpw5kczi1c21ewml8829axha149dckia8r5g4pnxknh6qdb';
        const subplebbitList = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbitListName);

        // Generate a new IPNS record to store the posts of the subplebbit
        let { cid } = await ipfs.add(JSON.stringify(
            {
                posts: [],
                latestPost: null
            }
        ));
        await ipfs.key.gen(title, { type: 'rsa', size: 2048 });
        let response = await ipfs.name.publish('/ipfs/' + cid, { key: title });

        // Create the IPFS storing the subplebbit
        let newSubplebbitCid = ((await ipfs.add(JSON.stringify(
            {
               title,
               latestPosts: response.name
            }
        ))).cid).toString();

        // Add a new IPNS record to add the newly added subplebbit CID
        subplebbitList.data.subplebbits.push(newSubplebbitCid);
        cid = (await ipfs.add(JSON.stringify(subplebbitList.data))).cid;
        await ipfs.name.publish('/ipfs/' + cid, { key: "Plebbit" });

        console.log(newSubplebbitCid);
        res.json({ "CID": newSubplebbitCid });
    },
    getLatestSubplebbits: async (req, res) => {
        let amount = req.params.amount;

        // Get the content of the IPFS containing the subplebbit's list
        const subplebbitListName = 'k2k4r8m9xwpw5kczi1c21ewml8829axha149dckia8r5g4pnxknh6qdb';
        const subplebbitList = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbitListName);

        // update the maximum amount of subplebbits if it exceed that number
        amount = amount > subplebbitList.data.subplebbits.length ? subplebbitList.data.subplebbits.length : amount;

        // go through the array of subplebbits
        let result = [];
        for (let i = 0; i < amount; ++i) {
            // retrieve the content of the IPFS subplebbit file
            const subplebbit = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + subplebbitList.data.subplebbits[i]);

            // retrieve the data from the IPNS file linked to the IPFS subplebbit file
            const subplebbitLatestPosts = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbit.data.latestPosts);

            // retrieve the latest post data
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

        // retrieve the content of the IPFS subplebbit file
        const subplebbit = await axios.get(process.env.IPFS_GATEWAY + 'ipfs/' + CID);

        // retrieve the data from the IPNS file linked to the IPFS subplebbit file
        const subplebbitLatestPosts = await axios.get(process.env.IPFS_GATEWAY + 'ipns/' + subplebbit.data.latestPosts);

        // retrieve the latest post data
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
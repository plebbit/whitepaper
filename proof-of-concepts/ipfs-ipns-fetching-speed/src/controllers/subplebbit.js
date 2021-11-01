import ipfs from '../config/ipfs.js';
import axios from 'axios';

const subplebbit = {
    createSubplebbit: async (req, res) => {
        const title = req.body.title;
        const subplebbitListName = 'k2k4r8m9xwpw5kczi1c21ewml8829axha149dckia8r5g4pnxknh6qdb';
        const subplebbitList = await axios.get(process.env.GATEWAY + 'ipns/' + subplebbitListName);

        let { cid } = await ipfs.add(JSON.stringify(
            {
                posts: [],
                latestPost: null
            }
        ));

        //await ipfs.key.gen(title, { type: 'rsa', size: 2048 });

        let response = await ipfs.name.publish('/ipfs/' + cid, { key: title });

        cid = (await ipfs.add(JSON.stringify(
            {
               title,
               latestPosts: response.name
            }
        ))).cid;

        subplebbitList.data.subplebbits.push(cid.toString());

        cid = (await ipfs.add(JSON.stringify(subplebbitList.data))).cid;

        await ipfs.name.publish('/ipfs/' + cid, { key: "Plebbit" });

        console.log(response);

        res.json({ response });
    },
    getSubplebbitByName: (req, res) => {
        res.json({"amazing": "trust"});
    },
    getLatestSubplebbit: (req, res) => {
        const amount = req.params.amount;

        

        res.json({"amazing": "trust"});
    }
}

export default subplebbit;
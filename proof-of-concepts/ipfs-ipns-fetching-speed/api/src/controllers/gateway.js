const gateway = {
    changeGateway: async (req, res) => {
        const IPFS_GATEWAY = req.body.IPFS_GATEWAY;

        process.env.IPFS_GATEWAY = IPFS_GATEWAY;
        res.status(200).json({ "status": "success" });
    }
}

export default gateway;
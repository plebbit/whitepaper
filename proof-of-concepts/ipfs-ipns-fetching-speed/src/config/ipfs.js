import { create } from 'ipfs-http-client'
import dotenv from 'dotenv';

dotenv.config();

const ipfs = create(process.env.IPFS_API);

export default ipfs;
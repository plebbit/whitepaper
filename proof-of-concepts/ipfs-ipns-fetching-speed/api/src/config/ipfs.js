import { create } from 'ipfs-http-client'
import dotenv from 'dotenv';

dotenv.config({ path: new URL(import.meta.url + '/../../../../.env') });

const ipfs = create(process.env.IPFS_API);

export default ipfs;
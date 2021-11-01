import { create } from 'ipfs-http-client'
import dotenv from 'dotenv';

dotenv.config();

const ipfs = create(process.env.API)

export default ipfs;
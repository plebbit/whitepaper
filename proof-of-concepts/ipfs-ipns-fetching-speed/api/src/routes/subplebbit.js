import express from 'express';
import subplebbit from '../controllers/subplebbit.js';

const router = express.Router();

router.post("/", subplebbit.createSubplebbit);
router.get("/latest/:amount", subplebbit.getLatestSubplebbits);
router.get("/:CID", subplebbit.getSubplebbitByCID);

export default router;
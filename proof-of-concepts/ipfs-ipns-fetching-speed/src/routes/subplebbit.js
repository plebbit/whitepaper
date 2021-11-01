import express from 'express';
import subplebbit from '../controllers/subplebbit.js';

const router = express.Router();

router.post("/", subplebbit.createSubplebbit);
router.get("/:name", subplebbit.getSubplebbitByName);
router.get("/latest/:amount", subplebbit.getLatestSubplebbit);

export default router;
import express from 'express';
import post from '../controllers/post.js';

const router = express.Router();

router.post("/", post.createPost);
router.get("/:CID", post.getPostByCid);

export default router;
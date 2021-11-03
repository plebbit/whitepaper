import express from 'express';
import comment from '../controllers/comment.js';

const router = express.Router();

router.post("/", comment.createComment);

export default router;
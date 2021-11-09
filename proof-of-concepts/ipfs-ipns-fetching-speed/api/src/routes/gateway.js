import express from 'express';
import gateway from '../controllers/gateway.js';

const router = express.Router();

router.post('/', gateway.changeGateway);

export default router;
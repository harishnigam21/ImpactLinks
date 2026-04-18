import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/Payment.js';
import { jwtVerifier } from '../middlewares/jwt/jwtVerifier.js';
const router = express.Router();
router.post('/create-checkout', jwtVerifier, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
export default router;
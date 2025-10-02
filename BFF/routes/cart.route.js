import express from 'express';
import { clearCart, createCart, getCart, updateCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.route("/")
.get(getCart)
.post(createCart)
.put(updateCart)

router.route("/items")
.put(clearCart)

export default router;
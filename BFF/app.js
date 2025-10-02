import express from 'express';
import cors from 'cors';

import productRoutes from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';
import authRoutes from './routes/authRoutes.js'
import { authMiddleware } from './middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/error.utils.js';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:9001",
    credentials: true,
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api', authMiddleware, productRoutes);
app.use('/api/carts', authMiddleware, cartRoute)

app.use(errorHandler);

export default app;

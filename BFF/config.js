import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 4000,
    PRODUCT_SERVICE_BASE_URL: process.env.PRODUCT_SERVICE_BASE_URL,
    CART_SERVICE_BASE_URL: process.env.CART_SERVICE_BASE_URL,
};

export default config;
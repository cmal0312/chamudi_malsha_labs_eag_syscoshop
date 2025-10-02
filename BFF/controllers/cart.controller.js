import logger from "../utils/logger.utils.js";
import * as cartService from "../service/cart.service.js"

export const getCart = async(req, res, next) =>{
    try{
        const data = await cartService.getCart(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error fetching the cart for customer", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const createCart = async(req, res, next) => {
    try {
        const data = await cartService.createCart(req);
        res.status(200).json(data);    
    } catch (error) {
        logger.error("Error creating the cart for customer", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
}

export const updateCart = async(req, res, next) => {
    try {
        console.log("[BODY]", req.body);
        const data = await cartService.updateCart(req);
        res.status(200).json(data);    
    } catch (error) {
        logger.error("Error updating the cart",error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
}

export const clearCart = async(req, res, next) => {
    try {
        const data = await cartService.clearCart(req);
        res.status(200).json(data);    
    } catch (error) {
        logger.error("Error removing items from cart", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
}

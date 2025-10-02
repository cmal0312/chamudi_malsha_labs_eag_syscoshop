import logger from "../utils/logger.utils.js";
import * as productService from "../service/product.service.js"

export const getProducts = async(req, res, next) =>{
    try{
        const data = await productService.getProducts(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error fetching products from product-service", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const createProduct = async(req, res, next) =>{
    try{
        const data = await productService.createProduct(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error creating products", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const getProduct = async(req, res, next) => {
    try {
        const data = await productService.getProduct(req);
        res.status(200).json(data);  
    } catch (error) {
        logger.error("Error fetching product from product-service", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const updateProduct = async(req, res, next) => {
    try {
        const data = await productService.updateProduct(req);
        res.status(200).json(data);  
    } catch (error) {
        logger.error("Error updating the product", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const deleteProduct = async(req, res, next) => {
    try {
        const data = await productService.deleteProduct(req);
        res.status(200).json(data);  
    } catch (error) {
        logger.error("Error deleting the product", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const getCategories = async(req, res, next) =>{
    try{
        const data = await productService.getCategories(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error fetching categories from product-service", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const getCategory = async(req, res, next) =>{
    try{
        const data = await productService.getCategory(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error fetching category from product-service", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const createCategory = async(req, res, next) => {
    try{
        const data = await productService.createCategory(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error creating the new category", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const getSuppliers = async(req, res, next) => {
    try{
        const data = await productService.getSuppliers(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error fetching suppliers from product-service", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const createSupplier = async(req, res, next) => {
    try{
        const data = await productService.createSupplier(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error creating the new supplier", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const getSupplier = async(req, res, next) => {
    try{
        const data = await productService.getSupplier(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error fetching supplier from product-service", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

export const deleteSupplier = async(req, res, next) => {
    try{
        const data = await productService.deleteSupplier(req);
        res.status(200).json(data);
    } catch(error){
        logger.error("Error deleting the supplier", error);
        res.status(error.statusCode || 500).json(error.errorPayload || { message: "Internal Server Error" });
    }
};

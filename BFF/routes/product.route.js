import express from 'express';
import { createCategory, createProduct, createSupplier, deleteProduct, deleteSupplier, getCategories, getCategory, getProduct, getProducts, getSupplier, getSuppliers, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.route("/products")
.get(getProducts)
.post(createProduct)

router.route("/categories")
.get(getCategories)
.post(createCategory)

router.route("/categories/:id")
.get(getCategory)

router.route("/products/:id")
.get(getProduct)
.put(updateProduct)
.delete(deleteProduct)

router.route("/suppliers")
.get(getSuppliers)
.post(createSupplier)

router.route("/suppliers/:id")
.get(getSupplier)
.delete(deleteSupplier)

export default router;
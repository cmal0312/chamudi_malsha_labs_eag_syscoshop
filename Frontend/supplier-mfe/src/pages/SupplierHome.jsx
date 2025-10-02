import React, { useState, useEffect, use } from "react";
import { Layout, Spin, Button, notification, message } from "antd";
import HeaderBar from "../components/HeaderBar";
import ProductTabs from "../components/ProductTabs";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct
} from "../services/productService";
import { getCurrentUser } from "../services/authService";
import { getSuppliers, createSupplier, getSupplierById } from "../services/supplierService";

const { Content } = Layout;

const theme = {
  lightGray: "#f9f9f9",
};

const SupplierHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState("approved");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [currentSupplier, setCurrentSupplier] = useState(null);

  useEffect(() => {
    const initSupplier = async () => {
      try{
        const user = await getCurrentUser();
        if (!user?.userId) {
          throw new Error("No user info found");
        }
        const supplier = await getSupplierById(user.userId);
        setCurrentSupplier(supplier);
      } catch (err) {
        console.error("Error initializing supplier:", err);
        notification.error({
          message: "Initialization Error",
          description: `Failed to initialize supplier profile. ${err.message}`,
        });
      }
    };
    initSupplier();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const roleHeader = activeTab === "approved" ? "customer" : "admin";
        const data = await fetchProducts(
          currentSupplier?.id, 
          roleHeader
        );
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentSupplier){
      loadProducts();
    }
  }, [activeTab, currentSupplier]);

const handleAddProduct = async (productData) => {
  try {
    const newProduct = await addProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
    notification.success({
      message: "Product Added",
      description: `${newProduct.name} has been added successfully.`,
    });
    setAddModalVisible(false);
  } catch (err) {
    console.error("Error adding product", err);
    notification.error({
      message: "Add Failed",
      description: `Failed to add product.`,
    });
  }
};

const handleDeleteProduct = async (product) => {
  try {
    await deleteProduct(product.id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    notification.success({
      message: "Product Deleted",
      description: `${product.name} has been successfully deleted.`,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    notification.error({
      message: "Delete Failed",
      description: `Failed to delete ${product.name}. ${err.message}`,
    });
  }
};


const handleEditProduct = (product) => {
  setEditingProduct(product);
  setEditModalVisible(true);
};

const handleSaveProduct = async (updatedProduct) => {
  try {
    const savedProduct = await updateProduct(updatedProduct.id, updatedProduct);
    setProducts((prev) =>
    prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
  );
  notification.success({
        message: "Product Updated",
        description: `${savedProduct.name} has been updated successfully.`,
      });
      setEditModalVisible(false);
      setEditingProduct(null);
  } catch (err) {
    console.error(err);
    notification.error({
      message: "Update Failed",
      description: `Failed to update ${updatedProduct.name}.`,
    });
  }
};

  return (
    <Layout style={{ minHeight: "100vh", background: theme.primary, padding: 40 }}>
      <HeaderBar onAddProductClick={() => setAddModalVisible(true)} />

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      ) : (
        <Content>
          <ProductTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </Content>
      )}

      <AddProductModal
        visible={addModalVisible}
        onOk={handleAddProduct}
        onCancel={() => setAddModalVisible(false)}
        currentSupplier={currentSupplier}
      />

      <EditProductModal
  visible={editModalVisible}
  onCancel={() => setEditModalVisible(false)}
  onSave={handleSaveProduct}
  product={editingProduct}
/>

    </Layout>
  );
};

export default SupplierHome;

import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { fetchProducts, updateProduct } from "../services/productService";
import { Empty, Spin, notification } from "antd";
import ProductTabs from "../components/ProductTabs";

const theme = {
  primary: "#0076ce",
  lightGray: "#f9f9f9",
  textGray: "#666",
  danger: "#d9534f",
};

const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("unapproved");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAccept = async (product) => {
    const updatedProduct = { ...product, approved: true, rejected: false };
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      notification.success({
        message: "Product Accepted",
        description: `${product.name} has been approved.`,
      });
    } catch (err) {
      console.error("Error Approving product:", err);
      notification.error({
        message: "Approval Failed",
        description: `Failed to Approve ${product.name}. ${err.message}`,
      });
    }
  };

  const handleReject = async (product) => {
    const updatedProduct = { ...product, approved: false, rejected: true };
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      notification.success({
        message: "Product Rejected",
        description: `${product.name} has been rejected.`,
      });
    } catch (err) {
      console.error("Error Rejecting product:", err);
      notification.error({
        message: "Rejection Failed",
        description: `Failed to Reject ${product.name}. ${err.message}`,
      });
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: theme.lightGray,
        minHeight: "100vh",
      }}
    >
      <HeaderBar theme={theme} />

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      ) : products.length === 0 ? (
        <Empty description="No Products Found" style={{ marginTop: "100px" }} />
      ) : (
        <ProductTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          products={products}
          onAccept={handleAccept}
          onReject={handleReject}
          theme={theme}
        />
      )}
    </div>
  );
};

export default AdminHome;

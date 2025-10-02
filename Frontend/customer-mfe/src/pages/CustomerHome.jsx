import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Empty } from "antd";
import HeaderBar from "../components/HeaderBar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import AddToCartModal from "../components/AddToCartModal";
import CartDrawer from "../components/CartDrawer";

import { fetchProducts } from "../services/productService";
import { fetchCategories } from "../services/categoryService";
import { fetchCart } from "../services/cartService";

const theme = {
  primary: "#0076ce",
  lightGray: "#f9f9f9",
  textGray: "#666",
  danger: "#d9534f",
};

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: "", category: null });

  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartCount, setCartCount] = useState(0);

  const [isCartDrawerVisible, setIsCartDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const initData = async () => {
      try {
        const [cats, cartData] = await Promise.all([
          fetchCategories(),
          fetchCart(),
        ]);
        setCategories(cats || []);
        setCart(cartData || { items: [], total: 0 });
      } catch (err) {
        console.error("Init fetch error:", err);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchAndSetCategories();
  }, []);

  useEffect(() => {
    setCartCount(cart.items.length);
  }, [cart]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(filters);
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalVisible(true);
  };

  const handleAddToCart = async () => {
    const updatedItems = [...cart.items];
    const existing = updatedItems.find(
      (i) => i.productId === selectedProduct.id
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      updatedItems.push({
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        imageUrl: selectedProduct.imageUrl,
      });
    }

    setCart((prev) => ({
      items: updatedItems,
      total: updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    }));

    try {
      await updateCart({ items: updatedItems }); 
    } catch (err) {
      console.error("Error updating cart on backend", err);
    }

    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
      }}
    >
      <HeaderBar
        cartCount={cartCount}
        onCartClick={() => setIsCartDrawerVisible(true)}
        theme={theme}
      />

      <Filters
        categories={categories}
        onSearch={(value) => setFilters((prev) => ({ ...prev, search: value }))}
        onCategoryChange={(value) =>
          setFilters((prev) => ({ ...prev, category: value || null }))
        }
      />

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      ) : products.length === 0 ? (
        <Empty description="No Products Found" style={{ marginTop: "100px" }} />
      ) : (
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCartClick}
                theme={theme}
              />
            </Col>
          ))}
        </Row>
      )}

      <AddToCartModal
        visible={isModalVisible}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        onOk={handleAddToCart}
        onCancel={() => setIsModalVisible(false)}
        theme={theme}
      />

      <CartDrawer
        visible={isCartDrawerVisible}
        onClose={() => setIsCartDrawerVisible(false)}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
};

export default CustomerHome;

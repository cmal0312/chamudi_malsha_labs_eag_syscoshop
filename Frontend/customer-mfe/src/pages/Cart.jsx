// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Spin,
  Empty,
  Button,
  InputNumber,
  Modal,
  message,
} from "antd";
import {
  HomeOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const theme = {
  primary: "#0076ce", // Sysco blue
  lightGray: "#f9f9f9",
  textGray: "#666",
  danger: "#d9534f",
};

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(null);

  // Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/carts", {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "1", 
          },
        });
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart", err);
        message.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Handle Delete
  const handleDelete = (productId) => {
    Modal.confirm({
      title: "Remove Item",
      content: "Are you sure you want to remove this item from the cart?",
      okText: "Yes, Remove",
      okButtonProps: { style: { background: theme.danger, border: "none" } },
      onOk: () => {
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.productId !== productId),
        }));
        message.success("Item removed from cart");
      },
    });
  };
  const startEditing = (item) => {
    setEditingItem(item.productId);
    setNewQuantity(item.quantity);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setNewQuantity(null);
  };

  const confirmQuantityChange = (productId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ),
    }));
    setEditingItem(null);
    message.success("Quantity updated");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: theme.lightGray,
        minHeight: "100vh",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        <Col>
          <Button
            type="primary"
            shape="circle"
            icon={<HomeOutlined />}
            size="large"
            style={{
              background: theme.primary,
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              marginRight: "16px",
            }}
            onClick={() => (window.location.href = "/customer/home")}
          />
          <img
            src="https://cdn.shop.sysco.com/img/logo/group.png"
            alt="Sysco Logo"
            style={{ height: 40 }}
          />
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      ) : !cart || cart.items.length === 0 ? (
        <Empty description="Your cart is empty" style={{ marginTop: "100px" }} />
      ) : (
        <Row gutter={[16, 16]}>
          {cart.items.map((item) => (
            <Col span={24} key={item.productId}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  background: "#fff",
                }}
              >
                <Row align="middle" gutter={16}>
                  <Col span={12}>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <p
                      style={{
                        margin: "4px 0",
                        color: theme.primary,
                        fontWeight: 600,
                      }}
                    >
                      ${item.price}
                    </p>
                  </Col>
                  <Col span={4}>
                    {editingItem === item.productId ? (
                      <InputNumber
                        min={1}
                        value={newQuantity}
                        onChange={(val) => setNewQuantity(val)}
                      />
                    ) : (
                      <p style={{ margin: 0 }}>Qty: {item.quantity}</p>
                    )}
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    {editingItem === item.productId ? (
                      <>
                        <Button
                          type="link"
                          icon={<CheckOutlined style={{ color: "green" }} />}
                          onClick={() => confirmQuantityChange(item.productId)}
                        />
                        <Button
                          type="link"
                          icon={<CloseOutlined style={{ color: "red" }} />}
                          onClick={cancelEditing}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          type="link"
                          onClick={() => startEditing(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="link"
                          icon={
                            <DeleteOutlined style={{ color: theme.danger }} />
                          }
                          onClick={() => handleDelete(item.productId)}
                        />
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {cart && cart.items.length > 0 && (
        <div style={{ marginTop: "24px", textAlign: "right" }}>
          <h2>
            Total:{" "}
            <span style={{ color: theme.primary }}>${cart.total.toFixed(2)}</span>
          </h2>
          <Button
            type="primary"
            size="large"
            style={{ background: theme.primary, border: "none" }}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

import React, { useEffect, useState } from "react";
import { Drawer, List, InputNumber, Button, Spin, Empty, message, Space, Divider } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { fetchCart, updateCart } from "../services/cartService";

const theme = {
  primary: "#0076ce",
  danger: "#d9534f",
  textGray: "#666",
};

const CartDrawer = ({ visible, onClose, userId = "1" }) => {
  const [cart, setCart] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch cart when drawer opens
  useEffect(() => {
    if (visible) loadCart();
  }, [visible]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await fetchCart(userId);
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      message.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (item) => {
    setEditingItemId(item.productId);
    setTempQuantity(item.quantity);
  };

  const confirmEdit = async (itemId) => {
    try {
      const updatedItems = cart.items.map((i) =>
        i.productId === itemId ? { ...i, quantity: tempQuantity } : i
      );
      const updatedCart = await updateCart(updatedItems, userId);
      setCart(updatedCart);
      setEditingItemId(null);
    } catch (err) {
      console.error("Error updating cart item:", err);
      message.error("Failed to update item");
    }
  };

  const cancelEdit = () => setEditingItemId(null);

  const handleDelete = async (itemId) => {
    try {
      const updatedItems = cart.items.map((i) =>
        i.productId === itemId ? { ...i, quantity: 0 } : i
      );
      const updatedCart = await updateCart(updatedItems, userId);
      setCart(updatedCart);
      message.success("Item removed from cart");
    } catch (err) {
      console.error("Error deleting cart item:", err);
      message.error("Failed to remove item");
    }
  };

  return (
    <Drawer
      title="🛒 Your Cart "
      placement="right"
      width={420}
      onClose={onClose}
      open={visible}
    >
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      ) : !cart || cart.items.length === 0 ? (
        <Empty description="Your cart is empty" />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cart.items}
            renderItem={(item) => (
              <List.Item
                actions={[
                  editingItemId === item.productId ? (
                    <>
                      <Space>
                        <Button
                          type="primary"
                          icon={<CheckOutlined />}
                          size="small"
                          onClick={() => confirmEdit(item.productId)}
                          ghost
                        />
                        <Button
                          danger
                          icon={<CloseOutlined />}
                          size="small"
                          onClick={cancelEdit}
                          ghost
                        />
                      </Space>
                    </>
                  ) : (
                    <>
                      <Button
                      type="text"
                      shape="circle"
                      icon={<EditOutlined style={{ color: theme.primary }} />}
                      onClick={() => startEditing(item)}
                    />
                    <Button
                      type="text"
                      shape="circle"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item.productId)}
                    />
                    </>
                  ),
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/60"}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                    />
                  }
                  title={item.name}
                  description={
                    <>
                      <p style={{ margin: 0 }}>
                        Price: <b>$ {item.price}</b>
                      </p>
                      {editingItemId === item.productId ? (
                        <InputNumber
                          min={1}
                          value={tempQuantity}
                          onChange={setTempQuantity}
                        />
                      ) : (
                        <p style={{ margin: 0, color: theme.textGray }}>
                          Qty: {item.quantity}
                        </p>
                      )}
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <div style={{ marginTop: 20, textAlign: "right" }}>
            <h3>
              Total: <span style={{ color: theme.primary }}>$ {cart.total}</span>
            </h3>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;

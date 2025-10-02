import React from "react";
import { Modal, Row, Col, InputNumber, Tag, message } from "antd";
import { updateCart } from "../services/cartService";

const AddToCartModal = ({
  visible,
  product,
  quantity,
  setQuantity,
  onCancel,
  theme,
  onCartUpdated, 
}) => {
  const handleOk = async () => {
    if (!product) return;

    try {
      const items = [
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl,
        },
      ];

      const data = await updateCart(items);
      message.success(`${product.name} added to cart!`);

      if (onCartUpdated) {
        onCartUpdated(data); 
      }

      onCancel(); // close modal
    } catch (err) {
      console.error("Error adding to cart:", err);
      message.error("Could not add to cart");
    }
  };

  return (
    <Modal
      title="Add to Cart"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Add to Cart"
      okButtonProps={{
        style: { background: theme.primary, border: "none" },
        disabled: product?.available === 0,
      }}
    >
      {product && (
        <Row gutter={16}>
          <Col span={10}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Col>
          <Col span={14}>
            <h3>{product.name}</h3>
            <p style={{ color: theme.primary, fontWeight: 600 }}>
              ${product.price}
            </p>
            <p style={{ color: theme.textGray }}>{product.categoryName}</p>
            <p style={{ marginBottom: "8px" }}>{product.description}</p>
            {product.available === 0 ? (
              <Tag color={theme.danger}>Out of Stock</Tag>
            ) : (
              <div style={{ marginTop: "16px" }}>
                <p>Quantity:</p>
                <InputNumber
                  min={1}
                  max={product.available}
                  value={quantity}
                  onChange={(val) => setQuantity(val)}
                />
              </div>
            )}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default AddToCartModal;

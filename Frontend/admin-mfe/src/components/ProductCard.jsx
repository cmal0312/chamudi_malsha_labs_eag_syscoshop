import React from "react";
import { Card, Tag, Button, Flex, Row, Space } from "antd";
import { deleteProduct } from "../services/productService";

const ProductCard = ({ product, theme, onAccept, onReject, section }) => {
  const outOfStock = product.available === 0;

  const handleDelete = async (product) => {
    const res = await deleteProduct(product.id);
    if (res.status === 200) {
      alert("Product deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <Card
      hoverable
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      cover={
        <div style={{ position: "relative" }}>
          <img
            alt={product.name}
            src={product.imageUrl || ""}
            style={{ height: 200, width: "100%", objectFit: "cover" }}
          />
          {outOfStock && (
            <Tag
              color={theme.danger}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                borderRadius: "8px",
                padding: "4px 8px",
                fontWeight: 600,
              }}
            >
              Out of Stock
            </Tag>
          )}
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{product.name}</h3>
          <h4 style={{ margin: 0, color: theme.primary }}>
            ${product.price.toFixed(2)}
          </h4>
        </div>
        {/* <Button
          type="primary"
          style={{
            background: theme.primary,
            border: "none",
          }}
        /> */}
      </div>
      <p style={{ margin: "4px 0", fontSize: "0.9em" }}>
        {product.description}
      </p>

      <Space>
        {section === "unapproved" ? (
          <>
            <Row>
              <Button type="primary" ghost onClick={() => onAccept(product)}>
                Accept
              </Button>
            </Row>
            <Row>
              <Button
                type="primary"
                danger
                ghost
                onClick={() => onReject(product)}
              >
                Reject
              </Button>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Button type="primary" ghost onClick={() => onAccept(product)}>
                Accept
              </Button>
            </Row>
            <Row>
              <Button
                type="primary"
                danger
                ghost
                onClick={() => handleDelete(product)}
              >
                Delete Permanently
              </Button>
            </Row>
          </>
        )}
      </Space>
    </Card>
  );
};

export default ProductCard;

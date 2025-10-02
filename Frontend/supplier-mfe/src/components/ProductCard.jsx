import React from "react";
import { Card, Tag, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const theme = {
  textGray: "#666",
  primary: "#0076ce",
  danger: "#d9534f",
};

const ProductCard = ({ product, onEdit, onDelete, section }) => {
  const outOfStock = product.available === 0;

  return (
    <Card
      hoverable
      style={{
        borderColor: section === "Rejected" ? theme.danger : "#f0f0f0",
        background: section === "Rejected" ? "#fff1f0" : "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      bodyStyle={{ padding: 16 }}
      cover={
        <div style={{ position: "relative" }}>
          <img
            src={product.imageUrl || "https://via.placeholder.com/150"}
            alt={product.name}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
          {outOfStock && (
            <Tag
              color={theme.danger}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                borderRadius: 8,
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
          alignItems: "flex-start",
        }}
      >
        <div>
          <Space direction="horizontal" size="small">
            {section != "Rejected" && <Button
              icon={<EditOutlined />}
              style={{ fontSize: 16, color: theme.primary, cursor: "pointer" }}
              onClick={() => onEdit(product)}
            />}
            <Button
              icon={<DeleteOutlined />}
              style={{ fontSize: 16, color: theme.danger, cursor: "pointer" }}
              onClick={() => onDelete(product)}
            />
          </Space>
          <h3 style={{ margin: "0 0 8px 0" }}>{product.name}</h3>
          <p
            style={{ color: theme.textGray, fontWeight: 600, marginBottom: 4 }}
          >
            {product.description}
          </p>
          <p style={{ color: theme.primary, fontWeight: 600, marginBottom: 4 }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ color: theme.textGray, marginBottom: 8 }}>
            {product.available} {product.available === 1 ? "item" : "items"}{" "}
            available
          </p>
          {product.description && (
            <p style={{ color: theme.textGray, fontSize: 0.9 }}>
              {product.description.length > 60
                ? product.description.substring(0, 57) + "..."
                : product.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;

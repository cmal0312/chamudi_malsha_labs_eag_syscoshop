import React from "react";
import { Card, Button, Tag } from "antd";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const ProductCard = ({ product, onAddToCart, theme }) => {
  const outOfStock = product.available === 0;

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
          <h3 style={{ margin: 0, color:theme.primary }}>{product.name}</h3>
          <p
            style={{
              margin: 0,
              fontWeight: 500,
              color: theme.textGray,
            }}
          >
            $ {product.price}
          </p>
        </div>
        <Button
          type="primary"
          shape="circle"
          icon={<ShoppingCartOutlined style={{ color: theme.primary, fontSize: 20 }} />}

          style={{
            border: "1px solid #d9d9d9",
          }}
          onClick={() => onAddToCart(product)}
          disabled={outOfStock}
          ghost
        />
      </div>
      <p style={{ margin: "4px 0", fontSize: "0.9em" }}>
        {product.description}
      </p>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { Row, Col, Button, Badge, Space } from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const HeaderBar = ({ cartCount, onCartClick }) => {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Logout failed");
        return;
      }
      const data = await res.json();
      window.location.href = data.logoutUrl;
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        marginBottom: 24,
        padding: "8px 24px",
        borderBottom: "1.5px solid #f3eaeaff",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Col>
        <img
          src="https://cdn.shop.sysco.com/img/logo/group.png"
          alt="Sysco Logo"
          style={{ height: 36 }}
        />
      </Col>

      {/* Action Buttons */}
      <Col>
        <Space size="large">
          {/* Cart */}
          <Badge
            count={cartCount}
            showZero
            overflowCount={99}
            style={{
              backgroundColor: "#ff4d4f",
              boxShadow: "0 0 4px rgba(0,0,0,0.15)",
            }}
          >
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
              size="large"
              onClick={onCartClick}
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "50%",
                width: 48,
                height: 48,
                transition: "all 0.2s ease",
              }}
              ghost
            />
          </Badge>

          {/* Home */}
          <Button
            type="text"
            icon={<HomeOutlined style={{ fontSize: 20 }} />}
            size="large"
            href="/"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "50%",
              width: 48,
              height: 48,
              transition: "all 0.2s ease",
            }}
            ghost
          />

          {/* Logout */}
          <Button
            type="text"
            icon={<LogoutOutlined style={{ fontSize: 20 }} />}
            size="large"
            onClick={handleLogout}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "50%",
              width: 48,
              height: 48,
              transition: "all 0.2s ease",
            }}
            ghost
          />
        </Space>
      </Col>
    </Row>
  );
};

export default HeaderBar;

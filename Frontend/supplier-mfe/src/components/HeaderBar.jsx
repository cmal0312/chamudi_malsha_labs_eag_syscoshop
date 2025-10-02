import React from "react";
import { Row, Col, Button, Space } from "antd";
import { HomeOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";

const theme = {
  lightGray: "#f9f9f9",
};

const HeaderBar = ({ onAddProductClick }) => {

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
      background: "theme.lightGray",
      top: 0,
      zIndex: 1000,
    }}
  >
    {" "}
    <Col>
      <img
        src="https://cdn.shop.sysco.com/img/logo/group.png"
        alt="Sysco Logo"
        style={{ height: 40 }}
      />
    </Col>
    <Col>
      <Space size="large">
        <Button
          type="text"
          icon={<ShopOutlined style={{ fontSize: 20 }} />}
          size="large"
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "50%",
            width: 48,
            height: 48,
            transition: "all 0.2s ease",
          }}
          onClick={onAddProductClick}
          ghost
        />
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
)};

export default HeaderBar;

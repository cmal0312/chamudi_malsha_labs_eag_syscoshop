import React from "react";
import { Row, Col, Button, Badge, Space } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";

const HeaderBar = ({ cartCount, onCartClick, theme }) => {
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
      style={{ marginBottom: "24px" }}
    >
      <Col>
        <img
          src="https://cdn.shop.sysco.com/img/logo/group.png"
          alt="Sysco Logo"
          style={{ height: 40 }}
        />
      </Col>
      <Col>
        <Space>
          <Badge count={cartCount} showZero>
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
          </Badge>
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
          />{" "}
        </Space>
      </Col>
    </Row>
  );
};

export default HeaderBar;

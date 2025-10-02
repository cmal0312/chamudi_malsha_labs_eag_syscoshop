import React, { useState } from "react";
import { Card, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
import { navigateToUrl } from "single-spa";

function makeFakeJwt(payload) {
  const base64 = (obj) => btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  const header = base64({ alg: "none", typ: "JWT" });
  const body = base64(payload);
  return `${header}.${body}.`; 
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = ({ username, role }) => {
    setLoading(true);
    setTimeout(() => {
      const token = makeFakeJwt({
        sub: username,
        role,
        user: { name: username },
        iat: Math.floor(Date.now() / 1000),
      });
      dispatch(setToken(token));
      const start = role === "customer" ? "/customer/home"
                  : role === "supplier" ? "/supplier/dashboard"
                  : "/admin/users";
      navigateToUrl(start);
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "80vh" }}>
      <Card title="Sign in" style={{ width: 380 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input placeholder="jane.doe" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "customer", label: "Customer" },
                { value: "supplier", label: "Supplier" },
                { value: "admin", label: "Admin (Steward)" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

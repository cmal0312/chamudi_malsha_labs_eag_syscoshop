import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { navigateToUrl } from "single-spa";
import { handleTokenLogin } from "../store/authSlice"; 
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

const AuthCallback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code"); 
    if (code) {
      dispatch(handleTokenLogin(code)).then((action) => {
        if (handleTokenLogin.fulfilled.match(action)){
        const {role} = action.payload;
        switch (role) {
          case "customer":
            navigateToUrl("/customer/home");
            break;
          case "supplier":
            navigateToUrl("/supplier/dashboard");
            break;
          case "admin":
            navigateToUrl("/admin");
            break;
          default:
            navigateToUrl("/");
        }
      } else {
        navigateToUrl("/");
      }
      });
    } else {
      navigateToUrl("/"); 
    }
  }, [dispatch]);

  return <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
      }}
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 40, color: "#1890ff" }} spin />}
      />
      <Text style={{ marginTop: 16, fontSize: 18, color: "#555" }}>
        Logging you in... please wait
      </Text>
    </div>;
};

export default AuthCallback;

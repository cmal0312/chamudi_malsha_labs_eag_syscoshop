import React from "react";
import { Button } from "antd";
import { navigateToUrl } from "single-spa";
import "../theme.css";
import { getCognitoLoginUrl } from "../utils/cognito";

const LandingPage = () => {

    const handleSignIn = () => {
    window.location.href = getCognitoLoginUrl(); // redirect to Cognito
  };

  return (
    <div className="landing">
      {/* Header */}
      <div className="landing-header">
        <img
          src="https://images.contentstack.io/v3/assets/bltfe3373143ecd3517/bltacfaa1c5bd7305ea/64ec44050d55676a6d2fa9a1/Sysco-Logo-White1.png"
          alt="Sysco Logo"
          style={{ height: 40 }}
        />

        <nav>
          <a href="#about">About</a>
          <Button
            style={{
              background: "#43B02A",
              border: "none",
              color: "#fff",
              fontWeight: 600,
              padding: "0 20px",
            }}
            onClick={() => navigateToUrl("/shop")}
          >
            Shop Now
          </Button>
          <a href="#become" className="become">
            Become A Customer
          </a>
          <a onClick={handleSignIn} className="signin">
            Sign In
          </a>
        </nav>
      </div>

      {/* Hero */}
      <div className="landing-hero">
        <h1>Introducing Marketplace</h1>
        <p>
          Make Sysco your one-stop-shop with products from top Third Party
          industry partners – from food to non-food essentials.
        </p>

        <Button
          size="large"
          style={{
            background: "#43B02A",
            border: "none",
            color: "#fff",
            fontWeight: 600,
            padding: "0 50px",
            height: "50px",
          }}
          onClick={() => navigateToUrl("/login")}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;

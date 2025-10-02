import React from "react";
import { Tabs, Row, Col, Empty } from "antd";
import ProductCard from "./ProductCard";

const { TabPane } = Tabs;

const ProductTabs = ({ activeTab, onTabChange, products, onAccept, onReject, theme }) => {
  const unapprovedProducts = products.filter(p => !p.approved && !p.rejected);
  const rejectedProducts = products.filter(p => p.rejected === true);

  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab="New Products" key="unapproved">
        {unapprovedProducts.length === 0 ? (
          <Empty description="No Unapproved Products" style={{ marginTop: 50 }} />
        ) : (
          <Row gutter={[24, 24]}>
            {unapprovedProducts.map(product => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard 
                  product={product}
                  section="unapproved"
                  onAccept={onAccept}
                  onReject={onReject}
                  theme={theme}
                />
              </Col>
            ))}
          </Row>
        )}
      </TabPane>

      <TabPane tab="Rejected Products" key="rejected">
        {rejectedProducts.length === 0 ? (
          <Empty description="No Rejected Products" style={{ marginTop: 50 }} />
        ) : (
          <Row gutter={[24, 24]}>
            {rejectedProducts.map(product => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard 
                  product={product}
                  section="rejected"
                  onAccept={onAccept}
                  onReject={onReject}
                  theme={theme}
                />
              </Col>
            ))}
          </Row>
        )}
      </TabPane>
    </Tabs>
  );
};

export default ProductTabs;

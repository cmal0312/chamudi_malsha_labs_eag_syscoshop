import { useEffect, useState } from "react";
import { Tabs, Row, Col, Empty, Badge } from "antd";
import ProductCard from "./ProductCard";

const { TabPane } = Tabs;

const ProductTabs = ({
  activeTab,
  onTabChange,
  products,
  onEdit,
  onDelete,
}) => {
  const approvedProducts = products.filter((p) => p.approved === true);
  const unapprovedProducts = products.filter((p) => !p.approved && !p.rejected);
  const RejectedProducts = products.filter((p) => !p.approved && p.rejected);

  return (
    <Tabs activeKey={activeTab} onChange={onTabChange}>
      <TabPane
        tab={
          <>
            Approved Products{" "}
            <Badge
              count={approvedProducts.length}
              overflowCount={999}
              style={{ backgroundColor: "#1677ff", marginLeft: 8 }}
            />
          </>
        }
        key="approved"
      >
        {approvedProducts.length === 0 ? (
          <Empty description="No Approved Products" style={{ marginTop: 50 }} />
        ) : (
          <Row gutter={[24, 24]}>
            {approvedProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  product={product}
                  section="approved"
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Col>
            ))}
          </Row>
        )}
      </TabPane>

      <TabPane tab={
          <>
            Unapproved Products {" "}
            <Badge
              count={unapprovedProducts.length}
              overflowCount={999}
              style={{ backgroundColor: "#1677ff", marginLeft: 8 }}
            />
          </>
        } key="unapproved">
        {unapprovedProducts.length === 0 ? (
          <Empty
            description="No Unapproved Products"
            style={{ marginTop: 50 }}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {unapprovedProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  product={product}
                  section="unapproved"
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Col>
            ))}
          </Row>
        )}
      </TabPane>

      <TabPane tab={
          <>
            Rejected Products{" "}
            <Badge
              count={RejectedProducts.length}
              overflowCount={999}
              style={{ backgroundColor: "#1677ff", marginLeft: 8 }}
            />
          </>
        } key="Rejected">
        {RejectedProducts.length === 0 ? (
          <Empty description="No Rejected Products" style={{ marginTop: 50 }} />
        ) : (
          <Row gutter={[24, 24]}>
            {RejectedProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  product={product}
                  section="Rejected"
                  onEdit={onEdit}
                  onDelete={onDelete}
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

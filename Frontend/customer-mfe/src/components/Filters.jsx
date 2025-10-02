import React from "react";
import { Row, Col, Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const Filters = ({ categories, onSearch, onCategoryChange }) => (
  <Row gutter={12} style={{ marginBottom: "24px", flexWrap: "wrap" }}>
    <Col xs={24} sm={14} md={10} lg={8}>
      <Search
        placeholder="Search for products..."
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
        style={{
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      />
    </Col>
    <Col xs={24} sm={10} md={6} lg={4}>
      <Select
        placeholder="Select a category"
        size="large"
        style={{
          width: "100%",
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
        allowClear
        onChange={onCategoryChange}
      >
        {categories.map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.name}
          </Option>
        ))}
      </Select>
    </Col>
  </Row>
);

export default Filters;

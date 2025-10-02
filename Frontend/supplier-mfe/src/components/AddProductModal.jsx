import React, { useEffect, useState } from "react";
import { Modal, Input, InputNumber, Form, Select, Button, message } from "antd";
import { fetchCategories, addCategory } from "../services/categoryService";
import { useSelector } from "react-redux";

const { Option } = Select;

const AddProductModal = ({ visible, onCancel, onOk, currentSupplier }) => {

  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  useEffect(() => {
    if (visible) {
      loadCategories();
      form.setFieldsValue({ supplierId: currentSupplier?.id });
    } else {
      form.resetFields();
    }
  }, [visible, currentSupplier]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchCategories();
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
      message.error("Failed to load categories");
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const finalValues = { ...values, supplierId: currentSupplier?.cognitoId};
      onOk(finalValues);
    });
  };

  const handleAddCategory = async () => {
    try {
      const name = form.getFieldValue("newCategoryName");
      const description = form.getFieldValue("newCategoryDescription");
      if (!name) {
        return message.warning("Category name is required");
      }
      setAddingCategory(true);
      const newCategory = await addCategory({ name, description });
      message.success("Category added successfully");

      setCategories((prev) => [...prev, newCategory]);
      form.setFieldsValue({ categoryId: newCategory.id });

      form.setFieldsValue({
        newCategoryName: undefined,
        newCategoryDescription: undefined,
      });
    } catch (err) {
      console.error("Error adding category", err);
      message.error("Failed to add category");
    } finally {
      setAddingCategory(false);
    }
  };

  return (
    <Modal
      title="Add Product"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Add"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Available"
          name="available"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            { required: true, message: "Please select or create a category" },
          ]}
        >
          <Select
            placeholder="Select Category"
            loading={loadingCategories}
            allowClear
          >
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Or Add New Category">
          <Input.Group compact>
            <Form.Item name="newCategoryName" noStyle>
              <Input style={{ width: "40%" }} placeholder="Name" />
            </Form.Item>
            <Form.Item name="newCategoryDescription" noStyle>
              <Input style={{ width: "40%" }} placeholder="Description" />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleAddCategory}
              loading={addingCategory}
            >
              Add
            </Button>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Supplier ID"
          name="supplierId"
          rules={[{ required: true }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            defaultValue={currentSupplier?.id}
            disabled
          />
        </Form.Item>

        <Form.Item label="Image URL" name="imageUrl">
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;

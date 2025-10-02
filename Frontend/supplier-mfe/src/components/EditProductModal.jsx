import React, { useEffect, useState } from "react";
import { Modal, Input, InputNumber, Form } from "antd";

const EditProductModal = ({ visible, onCancel, onSave, product }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        available: product.available,
        imageUrl: product.imageUrl,
      });
    }
  }, [product, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      onSave({ ...product, ...values });
    });
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Save"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, type: "number", min: 0 }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Available" name="available" rules={[{ required: true, type: "number", min: 0 }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Image URL" name="imageUrl">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;

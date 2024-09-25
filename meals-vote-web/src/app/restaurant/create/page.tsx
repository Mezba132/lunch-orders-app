"use client";
import { createRestaurants } from "@/services/service";
import { Button, Card, Form, Input, message } from "antd";
import React from "react";

const createRestaurant = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const response = await createRestaurants(values);
      if (response.success) {
        message.success("Employee successfully Created!");
        form.resetFields();
      } else {
        message.error("Failed to create employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while create Employeee.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 1000, height: "80vh" }}>
        <h1>Create Restaurant</h1>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the restaurant name!" },
            ]}
          >
            <Input placeholder="Enter restaurant name" />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input placeholder="Enter Restaurant Address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Restaurants
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default createRestaurant;

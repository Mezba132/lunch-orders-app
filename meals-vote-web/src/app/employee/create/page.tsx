"use client";
import React from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import { createEmployees } from "@/services/service";

const { Option } = Select;

const CreateEmployee = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const response = await createEmployees(values);
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
        <h1>Create Employee</h1>
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
              { required: true, message: "Please input the employee name!" },
            ]}
          >
            <Input placeholder="Enter employee name" />
          </Form.Item>

          <Form.Item label="Designation" name="designation">
            <Input placeholder="Enter employee designation" />
          </Form.Item>

          <Form.Item
            label="Employee ID"
            name="empId"
            rules={[
              { required: true, message: "Please input the employee ID!" },
            ]}
          >
            <Input type="number" placeholder="Enter employee ID" />
          </Form.Item>

          <Form.Item label="Blood Group" name="bloodGroup">
            <Select placeholder="Select blood group">
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Employee
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEmployee;

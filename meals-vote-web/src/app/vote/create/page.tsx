"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Spin } from "antd";
import { fetchEmployees, fetchFoodPacks, submitVote } from "@/services/service";

const VoteForm: React.FC = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [foodPacks, setFoodPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const employeeResponse = await fetchEmployees();
      const foodPackResponse = await fetchFoodPacks();

      if (employeeResponse.success && foodPackResponse.success) {
        setEmployees(employeeResponse.data);
        setFoodPacks(foodPackResponse.data);
      } else {
        message.error("Failed to fetch employees or food packs.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const response = await submitVote(values);
      if (response.success) {
        message.success("Vote successfully submitted!");
        form.resetFields();
      } else {
        message.error("Failed to submit vote.");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      message.error("An error occurred while submitting the vote.");
    }
  };

  return (
    <div>
      <h1>Vote for Food Pack</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Employee"
            name="employeeId"
            rules={[{ required: true, message: "Please select an employee!" }]}
          >
            <Select placeholder="Select an employee">
              {employees.map((employee: any) => (
                <Select.Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Food Pack"
            name="foodPackId"
            rules={[{ required: true, message: "Please select a food pack!" }]}
          >
            <Select placeholder="Select a food pack">
              {foodPacks.map((foodPack: any) => (
                <Select.Option key={foodPack.id} value={foodPack.id}>
                  {foodPack.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Vote
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default VoteForm;

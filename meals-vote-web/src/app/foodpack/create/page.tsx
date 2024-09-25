"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, message, Space } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { fetchRestaurants, createFoodPack } from "../../../services/service";

const { Option } = Select;

const CreateFoodPack = () => {
  const [form] = Form.useForm();
  const [restaurants, setRestaurants] = useState<any>([]);
  const [imageFile, setImageFile] = useState<any>(null);
  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await fetchRestaurants();
      setRestaurants(data.data);
    } catch (error) {
      message.error("Failed to load restaurants");
    }
  };

  const handleImageUpload = (file: any) => {
    setImageFile(file);
    return false;
  };

  const onFinish = async (values: any) => {
    try {
      const formData: any = new FormData();
      formData.append("name", values.name);
      formData.append("discount", values.discount);
      formData.append("restaurantId", values.restaurantId);
      formData.append("image", imageFile);
      formData.append("items", JSON.stringify(values.items));
      await createFoodPack(formData);
      message.success("Food Pack created successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to create Food Pack");
    }
  };

  return (
    <div>
      <h1>Create Food Pack</h1>
      <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: "600px" }}>
        <Form.Item
          label="Food Pack Name"
          name="name"
          rules={[
            { required: true, message: "Please input the food pack name!" },
          ]}
        >
          <Input placeholder="Enter food pack name" />
        </Form.Item>

        <Form.Item label="Discount (%)" name="discount">
          <Input type="number" placeholder="Enter discount percentage" />
        </Form.Item>

        <Form.Item label="Food Pack Image" name="image">
          <Upload
            beforeUpload={handleImageUpload}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Select Restaurant"
          name="restaurantId"
          rules={[{ required: true, message: "Please select a restaurant!" }]}
        >
          <Select placeholder="Select a restaurant">
            {restaurants.map((restaurant: any) => (
              <Option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              <h3>Food Items</h3>
              {fields.map((field, index) => (
                <Space
                  key={field.key}
                  align="baseline"
                  style={{ display: "flex", marginBottom: 8 }}
                >
                  <Form.Item
                    {...field}
                    label={`Item Name ${index + 1}`}
                    name={[field.name, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the item name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter item name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Food Pack
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateFoodPack;

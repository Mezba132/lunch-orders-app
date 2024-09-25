"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  message,
  Button,
  Popconfirm,
  Card,
} from "antd";
import { fetchFoodPacks } from "@/services/service";

const { Title } = Typography;

const ViewFoodPacks = () => {
  const [foodPacks, setFoodPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFoodPacks();
  }, []);

  const loadFoodPacks = async () => {
    try {
      const response = await fetchFoodPacks();
      if (response.success) {
        setFoodPacks(response.data);
      } else {
        message.error("Failed to fetch food packs");
      }
    } catch (error) {
      message.error("An error occurred while fetching food packs");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Food Pack Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Restaurant",
      dataIndex: "restaurant",
      key: "restaurant",
      render: (restaurant: any) => restaurant.name,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: any) => (
        <ul>
          {items.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Food Pack"
          style={{ width: 100, height: "auto" }}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 1000, height: "100vh" }}>
        <Title level={2}>Food Packs</Title>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table
            dataSource={foodPacks}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 3 }}
          />
        )}
      </Card>
    </div>
  );
};

export default ViewFoodPacks;

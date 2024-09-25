"use client";
import { fetchRestaurants } from "@/services/service";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";

const createRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await fetchRestaurants();
      if (response.success) {
        setRestaurants(response.data);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      <Card style={{ width: 1000, height: "80vh" }}>
        <h1>Restaurant List</h1>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table
            dataSource={restaurants}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
    </div>
  );
};

export default createRestaurant;

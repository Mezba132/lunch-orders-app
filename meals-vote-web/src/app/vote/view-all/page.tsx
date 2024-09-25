"use client";
import React, { useEffect, useState } from "react";
import { Table, message, Spin } from "antd";
import { fetchAllVotes } from "@/services/service";

const AllVotes: React.FC = () => {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAllVotes();
        if (response.success) {
          setVotes(response.data);
        } else {
          message.error("Failed to fetch votes.");
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
        message.error("An error occurred while fetching votes.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = [
    {
      title: "Employee Name",
      dataIndex: ["employee", "name"],
      key: "employeeName",
    },
    {
      title: "Designation",
      dataIndex: ["employee", "designation"],
      key: "designation",
    },
    {
      title: "Food Pack",
      dataIndex: ["foodPack", "name"],
      key: "foodPack",
    },
    {
      title: "Discount",
      dataIndex: ["foodPack", "discount"],
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Food Pack Image",
      dataIndex: ["foodPack", "image"],
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Food Pack"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Vote Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
  ];

  return (
    <div>
      <h1>All Votes</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={votes}
          rowKey={(record: any) => record.id}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default AllVotes;

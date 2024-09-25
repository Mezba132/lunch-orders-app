"use client";
import React, { useEffect, useState } from "react";
import { Card, Descriptions, Image, Spin, message } from "antd";
import { fetchWinner } from "@/services/service";

const WinnerView: React.FC = () => {
  const [winner, setWinner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetchWinner();
      if (response.success) {
        setWinner(response.data);
      } else {
        message.error("Failed to fetch winner.");
      }
    } catch (error) {
      console.error("Error fetching winner:", error);
      message.error("An error occurred while fetching winner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Today's Food Pack Winner</h1>
      {loading ? (
        <Spin size="large" />
      ) : winner ? (
        <Card
          title={winner.name}
          bordered={false}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Food Pack Name">
              {winner.name}
            </Descriptions.Item>
            <Descriptions.Item label="Discount">
              {winner.discount}%
            </Descriptions.Item>
            <Descriptions.Item label="Restaurant Name">
              {winner.restaurant.name}
            </Descriptions.Item>
            <Descriptions.Item label="Restaurant Address">
              {winner.restaurant.address}
            </Descriptions.Item>
            <Descriptions.Item label="Food Pack Image">
              <Image width={200} src={winner.image} alt="Food Pack" />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <p>No winner data available</p>
      )}
    </div>
  );
};

export default WinnerView;

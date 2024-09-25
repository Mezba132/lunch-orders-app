"use client";
import React, { useEffect, useState } from "react";
import { List, Card, Spin, message } from "antd";
import { fetchFoodPacks, fetchRestaurants } from "@/services/service";

const Home: React.FC = () => {
  const [foodPacks, setFoodPacks] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const foodPackResponse = await fetchFoodPacks();
        const restaurantResponse = await fetchRestaurants();

        if (foodPackResponse.success && restaurantResponse.success) {
          setFoodPacks(foodPackResponse.data);
          setRestaurants(restaurantResponse.data);
        } else {
          message.error("Failed to fetch food packs or restaurants");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>Available Food Packs</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={foodPacks}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta
                  title={item.name}
                  description={`Restaurant: ${item.restaurant.name}`}
                />
                <div style={{ marginTop: 10 }}>
                  <strong>Food Items</strong>
                  <ul>
                    {item.items.map((foodItem: any) => (
                      <li key={foodItem.id}>{foodItem.name}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Home;

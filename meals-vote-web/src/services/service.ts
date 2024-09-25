import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createEmployees = async (data: {
  name: string;
  designation?: string;
  empId: number;
  bloodGroup?: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, data);
    return response.data;
  } catch (error) {
    console.error("Error create employee:", error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const updateEmployee = async (id: number, data: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/employees/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error delete employee:", error);
    throw error;
  }
};

export const createRestaurants = async (data: {
  name: string;
  address?: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/restaurants`, data);
    return response.data;
  } catch (error) {
    console.error("Error create restaurant:", error);
    throw error;
  }
};

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const createFoodPack = async (data: {
  name: string;
  restaurantId: number;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/foodpacks`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating food pack:", error);
    throw error;
  }
};

export const fetchFoodPacks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodpacks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food packs:", error);
    throw error;
  }
};

export const submitVote = async (voteData: any) => {
  const response = await axios.post(`${API_BASE_URL}/votes`, voteData);
  return response.data;
};

export const fetchAllVotes = async () => {
  const response = await axios.get(`${API_BASE_URL}/votes`);
  return response.data; // Assuming response contains the vote data
};

export const fetchWinner = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/votes/daily-winner`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

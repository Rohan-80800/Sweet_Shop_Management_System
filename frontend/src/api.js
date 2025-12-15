import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export const getAllSweets = () => API.get("/sweets", { withCredentials: true });

export const addSweet = (formData) =>
  API.post("/sweets", formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  });

export const updateSweet = (id, formData) =>
  API.put(`/sweets/${id}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  });

export const deleteSweet = (id) =>
  API.delete(`/sweets/${id}`, { withCredentials: true });

export const purchaseSweet = (cartItems) =>
  API.post("/sweets/purchase", { cartItems }, { withCredentials: true });

export const restockSweet = (id, quantity) =>
  API.post(`/sweets/${id}/restock`, { quantity }, { withCredentials: true });

export const registerUser = (userData) =>
  API.post("/auth/register", userData, { withCredentials: true });

export const loginUser = (userData) =>
  API.post("/auth/login", userData, { withCredentials: true });

export const getCurrentUser = () =>
  API.get("/auth/me", { withCredentials: true });

export const logoutUser = () =>
  API.get("/auth/signout", { withCredentials: true });

export const checkoutCart = (cartItems) =>
  axios.post("/api/sweets/checkout", { cartItems });

import axios from "axios";

const API = axios.create({ baseURL: "https://fakestoreapi.com" });

export async function getAllProducts() {
  const res = await API.get("/products");
  return res.data;
}

export async function getProductById(id) {
  const res = await API.get(`/products/${id}`);
  return res.data;
}

export async function getCategories() {
  const res = await API.get("/products/categories");
  return res.data;
}

export async function getProductsByCategory(category) {
  const res = await API.get(`/products/category/${category}`);
  return res.data;
}
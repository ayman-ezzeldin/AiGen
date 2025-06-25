// utils/api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/user-projects";

export const getUserProjects = async (username) => {
  return axios.get(`${BASE_URL}/my-projects/${username}/`);
};

export const getPublicProjects = async (username) => {
  return axios.get(`${BASE_URL}/public-projects/${username}/`);
};

export const uploadProject = async (projectData) => {
  console.log("Data : ",projectData);
  
  return axios.post(`${BASE_URL}/upload-project/`, projectData);
};

export const updateProject = async (projectId, projectData) => {
  return axios.put(`${BASE_URL}/update-project/${projectId}/`, projectData);
};

export const deleteProject = async (projectId) => {
  return axios.delete(`${BASE_URL}/delete-project/${projectId}/`);
};

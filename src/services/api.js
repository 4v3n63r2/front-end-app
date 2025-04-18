import axios from "axios";

// Reemplaza con tu propia URL de MockAPI
const API = axios.create({
  baseURL: "https://6801758b81c7e9fbcc42960b.mockapi.io/events"});

export const getEvents = () => API.get('/events'); 
export const getEvent = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post("/events", data);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

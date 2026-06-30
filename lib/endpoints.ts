/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./api-client";

export const api = {
  rooms: {
    getAll: () => apiClient.get("/api/rooms"),
    getBySlug: (slug: string) => apiClient.get(`/api/rooms/${slug}`),
    getById: (id: string) => apiClient.get(`/api/admin/rooms/by-id/${id}`),
    create: (data: any) => apiClient.post("/api/admin/rooms", data),
    update: (id: string, data: any) =>
      apiClient.patch(`/api/admin/rooms/by-id/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/admin/rooms/by-id/${id}`),
    toggleAvailability: (id: string) =>
      apiClient.patch("/api/admin/toggle", { id }),
  },

  bookings: {
    create: (data: any) => apiClient.post("/api/bookings", data),
    getAll: () => apiClient.get("/api/admin/bookings"),
    getById: (id: string) => apiClient.get(`/api/bookings/${id}`),
    update: (id: string, data: any) => apiClient.patch(`/api/bookings/${id}`, data),
  },

  payments: {
    createOrder: (bookingId: string) =>
      apiClient.post("/api/payments/create-order", {
        bookingId,
      }),
    verify: (data: any) => apiClient.post("/api/payments/verify", data),
  },

  admin: {
    login: (data: any) => apiClient.post("/api/admin/login", data),
    logout: () => apiClient.post("/api/admin/logout", {}),
    me: () => apiClient.get("/api/admin/me"),
  },
};

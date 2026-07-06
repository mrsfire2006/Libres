 import { clientFetch } from "@/lib/client/api-client";
import type { ResultOfBookResponse } from "../store/type";
import { APIAUTHORROUTES } from "./paths";
export const mockBooks = [
  {
    id: "1",
    title: "The Silent Path",
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400",
    price: 9.99,
    sales: 324,
    revenue: 3239.76,
    category: "Fiction",
    publishedDate: "2025-01-15",
    status: "published" as const,
  },
  {
    id: "2",
    title: "Digital Dreams",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    price: 12.99,
    sales: 512,
    revenue: 6650.88,
    category: "Technology",
    publishedDate: "2024-11-22",
    status: "published" as const,
  },
  {
    id: "3",
    title: "Recipes of Tomorrow",
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e63cf48?w=400",
    price: 14.99,
    sales: 267,
    revenue: 4005.33,
    category: "Cooking",
    publishedDate: "2024-10-08",
    status: "published" as const,
  },
  {
    id: "4",
    title: "Journey to Self",
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400",
    price: 11.99,
    sales: 98,
    revenue: 1175.02,
    category: "Self-Help",
    publishedDate: "2024-09-20",
    status: "draft" as const,
  },
];

export const mockEarnings = {
  totalRevenue: 15071.0,
  totalBooks: 4,
  totalSales: 1201,
  monthlyRevenue: 2845.5,
  monthlyGrowth: 12.5,
  averageSalePrice: 12.55,
};

export const mockRecentActivity = [
  {
    id: "1",
    book: "The Silent Path",
    type: "sale",
    amount: 9.99,
    date: "2025-01-25",
  },
  {
    id: "2",
    book: "Digital Dreams",
    type: "sale",
    amount: 12.99,
    date: "2025-01-24",
  },
  {
    id: "3",
    book: "Recipes of Tomorrow",
    type: "sale",
    amount: 14.99,
    date: "2025-01-24",
  },
  {
    id: "4",
    book: "Digital Dreams",
    type: "sale",
    amount: 12.99,
    date: "2025-01-23",
  },
  {
    id: "5",
    book: "The Silent Path",
    type: "sale",
    amount: 9.99,
    date: "2025-01-23",
  },
];

export const AuthorService = {
  uploadFile: async (formData: FormData) => {
    const response: ResultOfBookResponse = await clientFetch(
      APIAUTHORROUTES.UPLOAD,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    return response;
  },
  getEarningsStats: async () => {
    return {
      value: mockEarnings,
    };
  },

  getAuthorBooks: async () => {
    return {
      value: mockBooks,
    };
  },

  getRecentActivity: async () => {
    return {
      value: mockRecentActivity,
    };
  },
};

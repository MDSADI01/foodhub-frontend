import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export const providerService = {
  createProviderProfile: async function (payload: {
    image: string;
    description: string;
    restaurantName: string;
    address: string;
    phone: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/provider/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      data;

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to update profile" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  getProviderProfile: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/provider/profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load provider profile" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  createMeal: async function (payload: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/provider/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to create meal" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },

  getMealsByProvider: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/provider/meals`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load meals" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  getOrdersByProvider: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/provider/orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      data;

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load orders" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
};

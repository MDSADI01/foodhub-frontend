import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export const customerService = {
  updateProfile: async function (payload: {
    image: string;
    address: string;
    phone: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/profile`, {
        method: "PATCH",
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
  getOrderStatus: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        }
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load order" },
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

  getReviews : async function (payload:{
    customerId:String,
    mealId:string,
    rating:number,
    comment:string
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method:"POST",
        headers: {
          "Content-Type" : "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load order" },
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

  createReview : async function (mealId: string,rating:Number,comment:string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        headers: {
          Cookie: cookieStore.toString(),
        }
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load order" },
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

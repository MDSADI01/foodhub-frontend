import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export const reviewService = {
  createReviews: async function (payload: {
    customerId: String;
    mealId: string;
    rating: number;
    comment: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to create review" },
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

  getReview: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews/own`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load reviews" },
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
  getAllReviewByMealId: async function (mealId:string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews/meals/${mealId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to load reviews" },
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

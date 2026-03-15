import { env } from "@/env";

const API_URL = env.API_URL;

export const mealService = {
  getMeals: async function () {
    try {
      const res = await fetch(`${API_URL}/meals`, { next: { revalidate: 10 } });

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getMealsById: async function (id: string) {
    try {
        const res = await fetch(`${API_URL}/meals/${id}`, { next: { revalidate: 10 } });
  
        const data = await res.json();
  
        return { data: data, error: null };
      } catch (err) {
        return { data: null, error: { message: "Something went wrong" } };
      }
  }
};




import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
  getAllUsers: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();
      data;
      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to create order" },
        };
      }

      return { data, error: null };
    } catch (err) {
      err;
      return { data: null, error: { message: "Something is wrong" } };
    }
  },
  getAllCategories: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/category`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: data.error || { message: "Failed to retrieve category" },
        };
      }

      return { data, error: null };
    } catch (err) {
      err;
      return { data: null, error: { message: "Something is wrong" } };
    }
  },
  createCategories: async function (payload: {
    name: string;
    description: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/category`, {
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
          error: data.error || { message: "Failed to create category" },
        };
      }

      return { data, error: null };
    } catch (err) {
      err;
      return { data: null, error: { message: "Something is wrong" } };
    }
  },
};

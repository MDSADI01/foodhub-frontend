import { env } from "@/env";



const API_URL= env.NEXT_PUBLIC_API_URL;;


export const orderService = {
    createOrder: async function (payload: {
      customerId: string;
      items: { mealId: string; quantity: number }[];
      deliveryAddress: string;
    }) {
      try {
        const res = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
        console.log(data);
  
        if (!res.ok) {
          return { data: null, error: data.error || { message: "Failed to create order" } };
        }
  
        return { data, error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message || "Something went wrong" } };
      }
    },
  
    // Get all orders for a customer
    getCustomerOrders: async function (customerId: string) {
      try {
        const res = await fetch(`${API_URL}/orders?customerId=${customerId}`, { cache: "no-store" });
        const data = await res.json();
  
        return { data, error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message || "Something went wrong" } };
      }
    },
  
    // Get order by ID
    getOrderById: async function (customerId: string, orderId: string) {
      try {
        const res = await fetch(`${API_URL}/orders/${orderId}?customerId=${customerId}`, { cache: "no-store" });
        const data = await res.json();
  
        return { data, error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message || "Something went wrong" } };
      }
    }
  }
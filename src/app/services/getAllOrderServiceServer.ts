import { cookies } from "next/headers";
import { env } from "process";


const API_URL= env.NEXT_PUBLIC_API_URL;


export const orderServerService = {
   
    getAllOrders: async function () {
      try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/orders/all`,
          {
            headers:{
                Cookie:cookieStore.toString()
            }
          },
         );
        const data = await res.json();

        if (!res.ok) {
          return {
            data: null,
            error: data.error || { message: "Failed to load orders" },
          };
        }
  
        return { data, error: null }
      } 
       catch (err: any) {
        return { data: null, error: { message: err.message || "Something went wrong" } };
      }
    }
  
  
  }
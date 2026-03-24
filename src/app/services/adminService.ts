import { env } from "@/env";
import { cookies } from "next/headers"


const API_URL= env.API_URL;

export const adminService={
    getAllUsers: async function(){
       try{
        const cookieStore = await cookies()

        const res = await fetch(`${API_URL}/admin/users`,{
            headers:{
                Cookie: cookieStore.toString(),
            },
            cache: "no-store"
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            return { data: null, error: data.error || { message: "Failed to create order" } };
          }
    
          return { data, error: null };
       }
       catch(err){
        console.log(err)
        return {data: null, error: {message: "Something is wrong"}}
       }
    }
}
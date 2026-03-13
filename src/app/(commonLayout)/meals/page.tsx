'use client'

import { authClient } from "@/lib/auth-client"

const Meals = () => {
  
  const session = authClient.getSession();
  console.log(session)
  return (
    <div>This is Meals Page
      
    </div>
  )
}

export default Meals
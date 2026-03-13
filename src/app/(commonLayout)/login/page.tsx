import { userService } from "@/app/services/user.service"
import { LoginForm } from "@/components/modules/authentication/login-form"
import { authClient } from "@/lib/auth-client";


export default async function Page() {

const {data} = await userService.getSession();



  return (
    
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

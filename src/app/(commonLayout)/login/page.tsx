import { userService } from "@/app/services/user.service";
import { LoginForm } from "@/components/modules/authentication/login-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function Login() {
  await connection()
  const { data } = await userService.getSession();

  if (data) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

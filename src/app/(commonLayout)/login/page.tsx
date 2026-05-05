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
    <div className="flex min-h-svh w-full items-center justify-center px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

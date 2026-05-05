"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().min(6, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging User");
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          return toast.error(error.message, { id: toastId });
        }

        toast.success("User logged in Successfully", { id: toastId });

        router.push(redirect);
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const handleDemoLogin = (role: "ADMIN" | "CUSTOMER" | "PROVIDER") => {
    const credentials =
      role === "ADMIN"
        ? { email: "admin@example.com", password: "Admin1234" }
        : role === "PROVIDER"
          ? { email: "provider4@gmail.com", password: "provider4@1234" }
          : { email: "customer1@gmail.com", password: "customer1@1234" };

    form.setFieldValue("email", credentials.email);
    form.setFieldValue("password", credentials.password);
    toast.info(`Filled ${role.toLowerCase()} credentials`);
  };

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // BetterAuth expects an absolute callback URL for OAuth redirects.
      // Your `redirect` is often just a pathname (e.g. "/private"), which the backend
      // may interpret relative to its own origin (localhost:8000).
      const callbackURL = new URL(redirect, window.location.origin).toString();
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch (err: any) {
      toast.error(err?.message || "Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-2 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <CardContent className="space-y-4">
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="m@example.com"
                        name={field.name}
                        className="border-black focus-visible:border-black focus-visible:ring-black/30 dark:border-white/80 dark:focus-visible:border-white dark:focus-visible:ring-white/20"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        name={field.name}
                        className="border-black focus-visible:border-black focus-visible:ring-black/30 dark:border-white/80 dark:focus-visible:border-white dark:focus-visible:ring-white/20"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                className="w-full"
                type="submit"
                disabled={form.state.isSubmitting}
              >
                {form.state.isSubmitting
                  ? "Logging in..."
                  : "Login to your Account"}
              </Button>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleDemoLogin("CUSTOMER")}
                >
                  Demo Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleDemoLogin("PROVIDER")}
                >
                  Demo Provider
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleDemoLogin("ADMIN")}
                >
                  Demo Admin
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full gap-2 font-semibold"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <FaGoogle className="h-4 w-4 text-red-500" />
              )}
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </Button>
          </CardContent>
        </form>
        <div className="flex justify-center items-center pb-6 text-sm">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 text-primary font-bold hover:underline"
          >
            Register now
          </Link>
        </div>
      </Card>
    </div>
  );
}

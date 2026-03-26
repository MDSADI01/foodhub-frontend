"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Unauthorized Access</CardTitle>
          <CardDescription>
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Only authorized users can access this page. Please login with the correct account.
          </p>
        </CardContent>
        <CardFooter className="mx-auto">
          <Link href="/">
            <Button variant="outline" size="sm" className="w-full">
              Go back home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
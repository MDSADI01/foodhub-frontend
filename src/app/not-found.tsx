// src/app/not-found.tsx

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

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Oops! Something is wrong</CardTitle>
          <CardDescription>
            This card uses the small size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p >
            Looks like you are on wrong page.
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

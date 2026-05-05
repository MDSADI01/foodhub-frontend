"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { MealType } from "@/app/types/mealType";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { Button } from "./button";

export interface CustomerReview {
  id: string;
  customerId: string;
  mealId: string;
  rating: number;
  comment: string;
  createdAt: string;
  meal: MealType;
}

export interface CustomerReviewTableProps {
  myReviews: CustomerReview[];
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export function CustomerReviewTable({ myReviews }: CustomerReviewTableProps) {
  const [reviews, setReviews] = useState<CustomerReview[]>(myReviews);
  const [search, setSearch] = useState("");

  const filteredReviews = reviews.filter(
    (r) =>
      r.meal.name.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteReview = async (reviewId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error!", data?.error?.message || "Delete failed", "error");
        return;
      }
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));

      Swal.fire("Deleted!", "Review has been deleted.", "success");
    } catch (err: any) {
      Swal.fire("Error!", err.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableCaption>Your recent reviews</TableCaption>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Meal Name</TableHead>
              <TableHead className="font-bold">Comment</TableHead>
              <TableHead className="font-bold">Rating</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <TableRow key={review.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    {review.meal.name}
                  </TableCell>
                  <TableCell className="max-w-md truncate">
                    {review.comment}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{review.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteReview(review.id)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center h-32 text-muted-foreground"
                >
                  No reviews found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <div className="text-sm font-medium">Page 1 of 1</div>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  );
}

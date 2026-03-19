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
  // ✅ state to update UI after delete
  const [reviews, setReviews] = useState<CustomerReview[]>(myReviews);

  const handleDeleteReview = async (reviewId: string) => {
    // ✅ SweetAlert confirmation
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

      // ✅ update UI instantly
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));

      Swal.fire("Deleted!", "Review has been deleted.", "success");
    } catch (err: any) {
      Swal.fire("Error!", err.message || "Something went wrong", "error");
    }
  };

  return (
    <Table>
      <TableCaption>Your reviews</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-72">Meal Name</TableHead>
          <TableHead className="w-72">Comment</TableHead>
          <TableHead className="w-72">Rating</TableHead>
          <TableHead className="w-72">Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.meal.name}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="outline p-3 rounded-xl bg-red-500 font-bold text-white hover:bg-white hover:text-black"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No reviews yet
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

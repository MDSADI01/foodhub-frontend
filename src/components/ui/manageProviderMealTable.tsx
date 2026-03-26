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
import Link from "next/link";
import { UpdateMealButton } from "./updateMealButton";

export type Category = {
  name: string;
};

export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
};

export type ProviderMealTableProps = {
  providerMeal: Meal[];
};

const API_URL = env.NEXT_PUBLIC_API_URL;

export function ProviderMealTable({ providerMeal }: ProviderMealTableProps) {
  const [meals, setMeals] = useState<Meal[]>(providerMeal || []);
  meals;

  const handleDeleteMeal = async (mealId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/provider/meals/${mealId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error!", data?.message || "Delete failed", "error");
        return;
      }

      setMeals((prev) => prev.filter((meal) => meal.id !== mealId));

      Swal.fire("Deleted!", "Meal has been deleted.", "success");
    } catch (err: any) {
      Swal.fire("Error!", err.message || "Something went wrong", "error");
    }
  };
  return (
    <Table>
      <TableCaption>Your Meals</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-72">Meal Name</TableHead>
          <TableHead className="w-72">Category</TableHead>
          <TableHead className="w-72">Update</TableHead>
          <TableHead className="w-72">Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {meals.length > 0 ? (
          meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell className="font-medium">{meal.name}</TableCell>
              <TableCell>{meal.category.name}</TableCell>
              <TableCell>
                <UpdateMealButton meal={meal}></UpdateMealButton>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleDeleteMeal(meal.id)}
                  className="outline p-3 rounded-xl transition duration-300 bg-red-500 font-bold text-white hover:bg-white hover:text-black"
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

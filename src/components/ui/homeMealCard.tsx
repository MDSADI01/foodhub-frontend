"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { MealType } from "@/app/types/mealType";

type MealPreviewProps = {
  meals?: MealType[]; // make optional
};

export default function MealPreview({ meals = [] }: MealPreviewProps) {
  const router = useRouter();

  // Show only the first 4 meals safely
  const previewMeals = Array.isArray(meals) ? meals.slice(0, 4) : [];

  return (
    <section className="my-20 w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Popular Meals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {previewMeals.map((meal) => (
          <Card
            key={meal.id}
            className="shadow-md text-center group hover:shadow-xl transition-shadow border-2 hover:border-primary/50 flex flex-col h-full"
          >
            <CardHeader className="p-4">
              <CardTitle className="text-xl line-clamp-1">
                {meal.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <div className="overflow-hidden rounded-xl mb-4 aspect-square bg-muted">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src={meal.imageUrl || "/placeholder-meal.jpg"}
                  alt={meal.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x400?text=No+Image+Available";
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] mb-4">
                {meal.description}
              </p>
              <p className="text-lg font-bold text-primary mb-4">
                ৳{meal.price}
              </p>
              <Button asChild className="w-full font-bold">
                <Link href={`/meals/${meal.id}`}>See Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

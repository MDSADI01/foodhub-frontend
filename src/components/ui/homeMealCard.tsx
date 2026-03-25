"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

type MealPreviewProps = {
  meals: Meal[];
};

export default function MealPreview({ meals }: MealPreviewProps) {
  const router = useRouter();

  // Show only the first 3 meals
  const previewMeals = meals.slice(0, 3);

  const handleSeeMore = () => {
    router.push("/meals"); // Redirect to full meals page
  };

  return (
    <section className="my-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
        {previewMeals.map((meal) => (
          <Card key={meal.id} className="shadow-md w-[300px] text-center">
            <CardHeader>
              <CardTitle>{meal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <img
                  className="w-50 h-50 rounded-2xl object-cover mx-auto"
                  src={meal.imageUrl}
                  alt=""
                />
              </div>
              <p className="font-semibold my-2">{meal.description}</p>
              <p className="mt-2 font-semibold">Price: ${meal.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {meals.length > 3 && (
        <div className="text-center mt-6">
          <Button onClick={handleSeeMore}>See More Meals</Button>
        </div>
      )}
    </section>
  );
}

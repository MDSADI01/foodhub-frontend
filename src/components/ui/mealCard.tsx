'use client'
import { faker } from "@faker-js/faker";
import { Bath, Bed, Maximize } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MealType } from "@/app/types/mealType";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface MealCardProps {
  meal: MealType; 
}

export const title = "Image Card";

const price = faker.commerce.price({ min: 100_000, max: 500_000, dec: 0 });
const beds = faker.number.int({ min: 2, max: 5 });
const baths = faker.number.int({ min: 1, max: 3 });
const area = faker.number.int({ min: 200, max: 500 });

const MealCard = ({meal}: MealCardProps) => {
     
  const { name, price ,imageUrl,id } = meal;

  const router = useRouter();

  const handleMealOrder = () =>{
    router.push(`/meals/${id}`)
  };
  
  return (
  
  <Card className="w-3/4 max-w-md overflow-hidden">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>
        A luxurious 3-bedroom house with a modern design.
      </CardDescription>
    </CardHeader>
    <CardContent className="p-0">
      {/** biome-ignore lint/performance/noImgElement: "Kibo UI is framework agnostic" */}
      <img
        alt=""
        className="w-full h-50 object-cover rounded-xl"
        src={imageUrl}
       
      />
    </CardContent>
    <CardFooter className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        
        <Button variant="outline" onClick={handleMealOrder}>Order Meal</Button>
        
      </div>
      <p className="text-2xl font-bold">৳{price}</p>
    </CardFooter>
  </Card>
)

};

export default MealCard;

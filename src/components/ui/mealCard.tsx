'use client'

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
      </CardDescription>
    </CardHeader>
    <CardContent className="p-0">
   
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

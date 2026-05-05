"use client";

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
import { Star, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface MealCardProps {
  meal: MealType;
}

export const title = "Image Card";

const MealCard = ({ meal }: MealCardProps) => {
  const { name, price, imageUrl, id, description, provider } = meal;

  const router = useRouter();

  const handleMealOrder = () => {
    router.push(`/meals/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="w-full h-full flex flex-col overflow-hidden transition-all hover:shadow-xl border-2 hover:border-primary/50 group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={imageUrl}
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span>4.5</span>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl line-clamp-1">{name}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs min-h-[2.5rem]">
          {description ||
            "Freshly prepared delicious meal made with high-quality ingredients."}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{provider?.restaurantName || "Local Restaurant"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>20-30 min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <p className="text-xl font-bold text-primary">৳{price}</p>
        <Button size="sm" onClick={handleMealOrder} className="font-semibold">
          View Details
        </Button>
      </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MealCard;

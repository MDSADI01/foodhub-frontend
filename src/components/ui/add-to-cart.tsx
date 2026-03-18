"use client";
import { useCart } from "@/app/context/cart-context";
import { MealType } from "@/app/types/mealType";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartButton from "./cartButton";

type AddCartProps = {
  mealDetails: MealType;
};

export function AddCart({ mealDetails }: AddCartProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      mealId: mealDetails.id,
      name: mealDetails.name,
      price: mealDetails.price,
      quantity: 1,
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add to Cart</SheetTitle>
          <SheetDescription>Add to cart your desired meal</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <CartButton></CartButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

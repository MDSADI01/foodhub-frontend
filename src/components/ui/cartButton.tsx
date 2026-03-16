"use client";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useCart } from "../modules/cartContext/cartContex";

const AddToCartButton = ({ meal }: any) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(meal);
    toast.success("Meal added to cart");
  };

  return (
    <Button onClick={handleAdd}>
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
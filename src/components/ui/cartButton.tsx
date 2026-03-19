"use client";
import { useCart } from "@/app/context/cart-context";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { MealType } from "@/app/types/mealType";


type CartButtonProps = {
  mealDetails:MealType
}

export default function CartButton({mealDetails}:CartButtonProps) {
  const { cart, increment, decrement, removeFromCart, totalPrice } = useCart();
  const router = useRouter();
  const { id } = mealDetails;

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      {cart.map((item) => (
        <div key={item.mealId} className="w-full">
          <h2 className="font-extrabold text-3xl">{item.name}</h2>
          <p className="font-extrabold text-2xl">
            ৳ {item.price} x {item.quantity}
          </p>
          <div className="grid grid-cols-3 gap-5 my-5">
            <Button onClick={() => decrement(item.mealId)}>-</Button>
            <Button onClick={() => increment(item.mealId)}>+</Button>
            <Button onClick={() => removeFromCart(item.mealId)}>Remove</Button>
          </div>
        </div>
      ))}
      <h3 className="text-3xl my-5">Total: ৳{totalPrice}</h3>
      <Button onClick={() => router.push(`/meals/${id}/checkout`)}>CheckOut</Button>
    </div>
  );
}

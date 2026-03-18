"use client";

import { useState } from "react";
import { orderService } from "@/app/services/order.service";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const handleOrder = async () => {
    if (!session?.user?.id) {
      alert("Login first");
      return;
    }

    const payload = {
      customerId: session.user.id,
      deliveryAddress: address,
      items: cart.map((item) => ({
        mealId: item.mealId,
        quantity: item.quantity,
      })),
    };
    console.log(payload);

    const res = await orderService.createOrder(payload);
    const toastId = toast.loading("Order is in process");
    if (res?.error) {
      toast.error(res.error.message, { id: toastId });
    } else {
      clearCart();
      toast.success("Order is successfully submitted", { id: toastId });
      router.back();
    }
  };

  return (
    <div className="grid grid-cols-1 place-items-center my-20">
      <h2 className="text-4xl font-extrabold mb-10">Checkout</h2>

      <Input
        className="mb-10 w-1/2"
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button onClick={handleOrder}>Place Order</Button>
    </div>
  );
}

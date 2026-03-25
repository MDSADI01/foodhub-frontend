"use client";

import { useState } from "react";
import Swal from "sweetalert2";

import { env } from "@/env";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

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

const API_URL = env.NEXT_PUBLIC_API_URL;

export function UpdateMealButton({ meal }: { meal: Meal }) {
  const [formData, setFormData] = useState({
    name: meal.name,
    description: meal.description,
    price: meal.price,
    imageUrl: meal.imageUrl,
    isAvailable: meal.isAvailable,
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating meal...");

    try {
      const res = await fetch(`${API_URL}/provider/meals/${meal.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.message || "Update failed", {
          id: toastId,
        });
      }

      toast.success("Meal updated successfully 🎉", {
        id: toastId,
      });

      setOpen(false);
    } catch (err: any) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="outline p-3 font-bold rounded-xl bg-blue-500 text-white hover:bg-white hover:text-black transition">
          Update
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Meal</DialogTitle>
          <DialogDescription>
            Edit the meal information below and save changes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label>Dish Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 mt-2 w-full"
            placeholder="Name"
          />
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 mt-2 w-full"
            placeholder="Description"
          />
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 mt-2 w-full"
          />
          <label>Image</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-2 mt-2 w-full"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white w-full p-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

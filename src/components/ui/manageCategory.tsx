"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env";
import { useState } from "react";
import Swal from "sweetalert2";

const API_URL = env.NEXT_PUBLIC_API_URL;

type Category = {
  id: string;
  description: string;
  name: string;
};

type CategoryTableProps = {
  categories: Category[];
};

const ManageCategory = ({ categories }: CategoryTableProps) => {
  const [category, setCategory] = useState<Category[]>(categories);
  console.log(category);

  const handleDeleteCategory = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/category/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete");
      }

      setCategory((prev) => prev.filter((cat) => cat.id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Categories</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-72">Category Name</TableHead>
            <TableHead className="w-72">Description</TableHead>
            <TableHead className="w-72">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {category.length > 0 ? (
            category.map((cat: any) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>
                {cat.description.split(" ").slice(0, 10).join(" ")}
                {cat.description.split(" ").length > 10 ? "..." : ""}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="outline p-3 rounded-xl bg-red-500 font-bold text-white hover:bg-white hover:text-black"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No reviews yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCategory;

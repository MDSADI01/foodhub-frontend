"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { MealType } from "@/app/types/mealType";
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

export interface Users {
  id: string;
  name: string;
  phone?: number;
  role: string;
  address?: string;
  updatedAt: string;
  createAt: string;
  emailVerified: boolean;
  image?: string;
  isActive: boolean;
}

export interface ManageUsersStatusTableProps {
  usersList: Users[];
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export function ManageUsersStatusTable({
  usersList,
}: ManageUsersStatusTableProps) {
  const [users, setUsers] = useState<Users[]>(usersList);
  users;

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${
        currentStatus ? "deactivate" : "activate"
      } this user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, isActive: !currentStatus } : user
          )
        );

        // refresh data (important)
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      error;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Table>
      <TableCaption>Users Status</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-72">User Name</TableHead>
          <TableHead className="w-72">Status</TableHead>
          <TableHead className="w-72">Role</TableHead>
          <TableHead className="w-72">Update Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                {user.isActive ? "Active ✅" : "Inactive ❌"}
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <button
                  className="outline p-3 rounded-xl bg-blue-500 font-bold text-white hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                  onClick={() => handleToggle(user.id, user.isActive)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </TableCell>
              <TableCell></TableCell>
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
  );
}

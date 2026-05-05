"use client";

import { useState } from "react";
import Swal from "sweetalert2";
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
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserMinus } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

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
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${
        currentStatus ? "deactivate" : "activate"
      } this user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      confirmButtonColor: currentStatus ? "#d33" : "#3085d6",
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
            user.id === id ? { ...user, isActive: !currentStatus } : user,
          ),
        );
        Swal.fire(
          "Updated!",
          `User has been ${!currentStatus ? "activated" : "deactivated"}.`,
          "success",
        );
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or role..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
        <Table>
          <TableCaption>
            Manage system users and their access status.
          </TableCaption>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">User Name</TableHead>
              <TableHead className="font-bold">Role</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-semibold uppercase text-[10px] tracking-wider"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <span className="text-sm">
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggle(user.id, user.isActive)}
                      className="gap-2"
                    >
                      {user.isActive ? (
                        <>
                          <UserMinus className="w-4 h-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Activate
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center h-32 text-muted-foreground"
                >
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <div className="text-sm font-medium">Page 1 of 1</div>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  );
}

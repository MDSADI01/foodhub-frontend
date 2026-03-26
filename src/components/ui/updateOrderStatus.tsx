"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { env } from "@/env";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_URL = env.NEXT_PUBLIC_API_URL;

export type OrderItemType = {
  id: string;
  quantity: number;
  price: number;
  status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  meal: {
    id: string;
    name: string;
  };
  orderId: string;
};

export type ProviderOrder = {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  orderItems: OrderItemType[];
  createdAt: string;
};

export type ProviderOrderTableProps = {
  orders: ProviderOrder[];
};

export function ProviderOrderTable({ orders }: ProviderOrderTableProps) {
  const [orderList, setOrderList] = useState<ProviderOrder[]>(orders || []);

  const handleStatusChange = async (orderItemId: string, newStatus: OrderItemType["status"]) => {
    try {
      const res = await fetch(`${API_URL}/provider/orders/${orderItemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data?.message || "Failed to update status", "error");
        return;
      }

      // Update state locally
      setOrderList((prev) =>
        prev.map((order) => ({
          ...order,
          orderItems: order.orderItems.map((item) =>
            item.id === orderItemId ? { ...item, status: newStatus } : item
          ),
        }))
      );

      Swal.fire("Success", "Order item status updated", "success");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  return (
    <Table>
      <TableCaption>Provider Orders</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Meal</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Change Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orderList.length > 0 ? (
          orderList.map((order) =>
            order.orderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{item.meal.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as OrderItemType["status"])}
                    className="p-2 rounded-lg border"
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="PREPARING">PREPARING</option>
                    <option value="READY">READY</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </TableCell>
              </TableRow>
            ))
          )
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No orders found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
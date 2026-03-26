import { orderServerService } from "@/app/services/getAllOrderServiceServer";
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

export interface CustomerReview {
  id: string;
  customerId: string;
  mealId: string;
  rating: number;
  comment: string;
  createdAt: string;
  meal: MealType;
}

export interface CustomerReviewTableProps {
  myReviews: CustomerReview[];
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export async function AllOrderTable() {
  const allOrders = await orderServerService.getAllOrders();
  const orders = allOrders?.data?.data;
  orders;

  return (
    <Table>
      <TableCaption>Order List</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-72">Customer Name</TableHead>
          <TableHead className="w-72">Order Items</TableHead>
          <TableHead className="w-72">Order Status</TableHead>
          <TableHead className="w-72">Order ID</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length > 0 ? (
          orders.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.customer.name}
              </TableCell>
              <TableCell>{order.orderItems[0].meal.name}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.id}</TableCell>
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

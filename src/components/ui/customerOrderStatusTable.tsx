import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  deliveryAddress: string;
}

type orderStatusTableProps = {
  orders: Order[];
};

export function OrderStatusTable({ orders }: orderStatusTableProps) {
 
  return (
    <Table>
      <TableCaption>A list of your recent orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-72">Order ID</TableHead>
          <TableHead className="w-72">Status</TableHead>
          <TableHead className="w-72">Address</TableHead>
          <TableHead className="w-72 text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.deliveryAddress}</TableCell>
            <TableCell className="text-right w-72">
            ৳ {order.totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

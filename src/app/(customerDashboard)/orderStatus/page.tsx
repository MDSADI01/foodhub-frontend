import { customerService } from "@/app/services/customer.service";
import { userService } from "@/app/services/user.service";
import { OrderStatusTable } from "@/components/ui/customerOrderStatusTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderStatus = async () => {

  const { data } = await userService.getSession()

  const customerId = data?.user?.id;

  const orderStatusData = await customerService.getOrderStatus(customerId);
  const orders = orderStatusData?.data?.data || [];
  console.log(orders);


  return (
    <div>
     {orders?.length > 0 ? (
        <OrderStatusTable orders={orders} />
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderStatus;

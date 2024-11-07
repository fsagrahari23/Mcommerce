import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AdiminOrderDeatilsView from "@/components/adminView/order-details";

import { Badge } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/admin-order-slice";
const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.order);

  function handleFetchOrderDetails(getId) {
    setOpenDetailsDialog(true);
    dispatch(getOrderDetails({ orderId: getId }));
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // useEffect(() => {
  //   if (orderDetails !== null) setOpenDetailsDialog(true);
  // }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.OrderDate.split("T")[0]}</TableCell>
                    <TableCell>{orderItem?.orderStatus}</TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleFetchOrderDetails(orderItem?._id);
                          }}
                        >
                          View Details
                        </Button>
                        <AdiminOrderDeatilsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrders;

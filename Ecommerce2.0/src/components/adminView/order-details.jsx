import { useState } from "react";
import { CommonForm } from "../common/Form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  getAllOrders,
  getOrderDetails,
  updateOrderDetails,
} from "@/store/admin-order-slice";
import { toast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};
const AdiminOrderDeatilsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  // const HandleStatusChange = (event) => {
  //   event.preventDefault();
  // };
  const dispatch = useDispatch();
  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((value) => value);
  };

  const HandleStatusChange = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setFormData(initialFormData);
    }

    dispatch(
      updateOrderDetails({
        orderId: orderDetails._id,
        orderStatus: formData.status,
      })
    ).then(() => {
      dispatch(getOrderDetails({ orderId: orderDetails._id }));
      toast({
        title: "Order updated successfully",
        type: "success",
      });
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px] sm:px-10 px-6 py-8 shadow-[0px_10px_38px_-10px_rgba(0,0,0,0.14]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.OrderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
              {orderDetails?.orderStatus}
            </Label>
          </div>
        </div>
        {/* order details */}

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>

            <ul className="grid gap-3">
              {orderDetails?.items && orderDetails?.items.length > 0
                ? orderDetails?.items.map((item) => (
                    <li
                      className="flex items-center justify-between"
                      key={item._id}
                    >
                      <span>Title: {item.name}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.salePrice - item.discountPrice}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {/* <span>Name:{user.username}</span> */}
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.zipcode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <CommonForm
          formControl={[
            {
              name: "status",
              label: "Order Status",
              type: "select",
              componentType: "select",
              options: [
                "Pending",
                "In Process",
                "In Shipping",
                "Rejected",
                "Delivered",
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          onSubmit={HandleStatusChange}
          buttonText="Save"
          isButtonDisabled={!isFormValid()}
        />
      </div>
    </DialogContent>
  );
};

export default AdiminOrderDeatilsView;

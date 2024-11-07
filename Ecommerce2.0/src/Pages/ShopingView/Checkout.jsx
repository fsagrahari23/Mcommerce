import Address from "@/components/shopingView/Address";
import img from "../../assets/account.jpg";
import UserCartContent from "@/components/shopingView/CartItemContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCart } from "@/store/cart-slice";
import CartContent from "@/components/shopingView/CartContent";
import { createOrder } from "@/store/order-slice";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
const Checkout = () => {
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shopCart);

  const { addresses } = useSelector((state) => state.userAddress);

  // console.log(cartItems);
  const cart = cartItems?.items;
  const dispatch = useDispatch();
  const totalAmount = cart
    ? cart.reduce(
        (sum, currenItem) =>
          sum +
          (currenItem.discountPrice > 0
            ? currenItem.salePrice - currenItem.discountPrice
            : currenItem.salePrice) *
            currenItem.quantity,
        0
      )
    : 0;
  useEffect(() => {
    dispatch(fetchCart({ userId: user.id }));
  }, [dispatch]);

  const [currentSelectedAddress, setSelectedAddress] = useState(null);

  const [isPaypalInitiated, setIsPaypalInitiated] = useState(false);

  const initiatePaypal = () => {
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select an address",
        type: "error",
        variant: "destructive",
      });
      return;
    } else if (isPaypalInitiated) {
      toast({
        title: "Payment already initiated",
        type: "error",
      });
      return;
    }
    if (!cart) {
      toast({
        title: "Cart is empty , Add item to cart",
        type: "error",
        variant: "destructive",
      });
      return;
    }
    const orderData = {
      userId: user.id,
      cartId: cartItems._id,
      items: cartItems.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        salePrice: item.salePrice,
        image: item.image,
        discountPrice: item.discountPrice,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        zipcode: currentSelectedAddress?.zipcode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
        total: totalAmount,
        quantity: cartItems.items.reduce((sum, item) => sum + item.quantity, 0),
      },
      orderStatus: "pending",
      orderDate: new Date(),
      paymentMethod: "paypal",
      totalAmount: totalAmount,
      paymentStatus: "Pending",
      payerId: "",
      paymentId: "",
    };

    dispatch(createOrder(orderData)).then((data) => {
      console.log(data);
      if (data.payload.success) {
        window.location.href = data.payload.data;
        setIsPaypalInitiated(true);
      }
    });
  };
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 mt-5 p-5">
        <Address setSelectedAddress={setSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length
            ? cartItems.items.map((item) => (
                <CartContent key={item.productId} item={item} />
              ))
            : null}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={initiatePaypal} className="w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

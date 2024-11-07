import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import CartContent from "./CartContent";

function UserCartContent({ cartItems, openCartSheet, cart, setOpenCartSheet }) {
  const navigate = useNavigate();

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

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {openCartSheet &&
          cartItems &&
          cart.map((item) => {
            return <CartContent key={item.productId} item={item} />;
          })}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-5"
      >
        CheckOut
      </Button>
    </SheetContent>
  );
}

export default UserCartContent;

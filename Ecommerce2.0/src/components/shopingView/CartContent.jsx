import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { deleteCart, fetchCart, updateCartItem } from "@/store/cart-slice";

const CartContent = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(item);
  const { productsList } = useSelector((state) => state.shopProducts);

  const handleCartItemDelete = (item) => {
    dispatch(deleteCart({ userId: user.id, productId: item.productId })).then(
      (data) => {
        if (data.payload.success) {
          dispatch(fetchCart({ userId: user.id }));
        }
        toast({
          title: "Item deleted successfully",
          type: data.payload.success ? "success" : "error",
        });
      }
    );
  };
 
  const handleUpdateQuantity = (item, action) => {
    const mainItem = productsList.find(
      (product) => product._id === item.productId
    );

    const getQantity = item.quantity;
    if (action === "plus") {
      if (getQantity + 1 > mainItem.totalStock) {
        return toast({
          title: `Only ${mainItem.totalStock} items are available`,
          type: "error",
          variant: "destructive",
        });
      }
    }

    dispatch(
      updateCartItem({
        id: user.id,
        productId: item.productId,
        quantity: action === "plus" ? item.quantity + 1 : item.quantity - 1,
      })
    ).then((data) => {
      dispatch(fetchCart({ userId: user.id }));

      toast({
        title: "Item updated successfully",
        type: data.payload.success ? "success" : "error",
      });
    });
  };

  return (
    <div key={item.productId} className="flex items-center space-x-4">
      <img
        src={item.image}
        alt={item.title}
        className="h-16 w-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            disbaled={item.quantity === 1}
            onClick={() => handleUpdateQuantity(item, "minus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decarese</span>
          </Button>
          <span className="text-md ">{item.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(item, "plus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-medium">
          ${(item.salePrice - item.discountPrice) * item.quantity}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(item)}
          className="cursor-pointer mt-1 "
          size={20}
        />
      </div>
    </div>
  );
};

export default CartContent;

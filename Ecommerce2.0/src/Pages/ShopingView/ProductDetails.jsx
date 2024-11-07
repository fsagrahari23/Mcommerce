import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "@/store/cart-slice";
import { toast } from "@/hooks/use-toast";

import { setProductDetails } from "@/store/product-slice";

const ProductDetails = ({ open, setOpen, productDetail }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const handleaddtocart = (id, totalStock) => {
    if (cartItems) {
      let cartItem = cartItems.items || [];
      if (cartItem.length) {
        let item = cartItem.findIndex((item) => item.productId === id);
        console.log(item);
        if (item > -1) {
          const getQantity = cartItem[item].quantity;
          console.log(getQantity, totalStock);
          if (getQantity + 1 > totalStock) {
            return toast({
              title: `Only ${totalStock} items are available`,
              type: "error",
              variant: "destructive",
            });
          }
        }
      }
    }

    dispatch(addToCart({ userId: user.id, productId: id, quantity: 1 })).then(
      (data) => {
        toast({
          title: data.payload.message,
          type: data.payload.success ? "success" : "error",
        });
        if (data.payload.success) {
          dispatch(fetchCart({ userId: user.id }));
        }
      }
    );
  };
  const handelDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };
  // console.log(ProductDetail);
  return (
    <>
      {productDetail && (
        <Dialog open={open} onOpenChange={handelDialogClose}>
          <DialogContent className="max-w-[90vw] grid sm:grid-cols-2 gap-8 sm:p-12 sm:max-w-[80vw] lg:max-w-[70vw]">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productDetail.image}
                alt={productDetail.name}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="">
              <div>
                <h1 className="text-3xl font-extrabold">
                  {productDetail?.name}
                </h1>
                <p className="text-muted-foreground text-2xl mb-5 mt-4">
                  {productDetail?.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`text-3xl font-bold text-primary ${
                    productDetail?.discountPrice > 0 ? "line-through" : ""
                  }`}
                >
                  ${productDetail?.salePrice}
                </p>
                {productDetail?.discountPrice > 0 ? (
                  <p className="text-2xl font-bold text-muted-foreground">
                    ${productDetail?.salePrice - productDetail.discountPrice}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="text-muted-foreground">(4.5)</span>
              </div>

              <div className="mt-5 mb-5">
                <Button
                  disabled={productDetail?.totalStock === 0}
                  onClick={() => {
                    handleaddtocart(
                      productDetail._id,
                      productDetail.totalStock
                    );
                  }}
                  variant="default"
                  className={`w-full ${
                    productDetail?.totalStock === 0
                      ? "bg-red-500 hover:bg-red-600 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {productDetail?.totalStock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
              </div>
              <Separator />
              <div className="max-h-[300px] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Review</h2>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Monu Agrahari</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-muted-foreground">
                        This is an awesome product
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Monu Agrahari</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-muted-foreground">
                        This is an awesome product
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Monu Agrahari</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-muted-foreground">
                        This is an awesome product
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Monu Agrahari</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-muted-foreground">
                        This is an awesome product
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Input placeholder="Add Review" />
                  <Button>Submit</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductDetails;

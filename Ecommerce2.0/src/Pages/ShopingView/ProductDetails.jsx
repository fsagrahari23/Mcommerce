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

const reviews = [
  {
    name: "John Doe",
    initials: "JD",
    rating: 5,
    comment: "Great product! Really satisfied with the quality and delivery.",
  },
  {
    name: "Jane Smith",
    initials: "JS",
    rating: 4,
    comment: "Good product, but the packaging could be improved.",
  },
  {
    name: "Alice Johnson",
    initials: "AJ",
    rating: 3,
    comment: "The product is decent but it didn't meet my expectations fully.",
  },
  {
    name: "Michael Lee",
    initials: "ML",
    rating: 5,
    comment: "Amazing! Exceeded my expectations, highly recommend this.",
  },
  {
    name: "Sophia Brown",
    initials: "SB",
    rating: 4,
    comment: "Overall happy with the purchase, the product works well.",
  },
];
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
          <DialogContent
            className="max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] grid sm:grid-cols-2 gap-8 p-6 sm:p-12"
            style={{ maxHeight: "90vh", overflowY: "auto" }} // Make the dialog scrollable
          >
            {/* Product Image Section */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productDetail.image}
                alt={productDetail.name}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* Product Details Section */}
            <div className="">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold">
                  {productDetail?.name}
                </h1>
                <p className="text-muted-foreground text-xl sm:text-2xl mb-5 mt-4">
                  {productDetail?.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p
                  className={`text-xl sm:text-3xl font-bold text-primary ${
                    productDetail?.discountPrice > 0 ? "line-through" : ""
                  }`}
                >
                  ${productDetail?.salePrice}
                </p>
                {productDetail?.discountPrice > 0 && (
                  <p className="text-lg sm:text-2xl font-bold text-muted-foreground">
                    ${productDetail?.salePrice - productDetail.discountPrice}
                  </p>
                )}
              </div>

              {/* Rating Section */}
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

              {/* Add to Cart Button */}
              <div className="mt-5 mb-5">
                <Button
                  disabled={productDetail?.totalStock === 0}
                  onClick={() =>
                    handleaddtocart(productDetail._id, productDetail.totalStock)
                  }
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

              {/* Separator */}
              <Separator />

              {/* Review Section */}
              <div className="max-h-[300px] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>

                {reviews.map((review, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{review.initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review.name}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <StarIcon
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                ))}

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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProducts, fetchAllProducts } from "@/store/admin-slice";
import { useToast } from "@/hooks/use-toast";

const AdminProductsView = ({
  product,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormdata,
  setCurrentDeleteId,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const deleteProduct = (id) => {
    dispatch(deleteProducts({ id })).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllProducts());
        setCurrentDeleteId(null);
        toast({
          title: "Product deleted successfully",
          type: "success",
        });
      }
    });
  };
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md hover:scale-105 transition duration-300 ease-in-out">
      <div>
        <div className="realtive ">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[300px] object-cover rounded-lg hover:scale-105 transition duration-300 ease-in-out p-3"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={
                product.discountPrice > 0
                  ? `line-through text-lg text-primary font-semibold`
                  : `text-lg text-primary font-semibold`
              }
            >
              ${product.salePrice}
            </span>
            {product.discountPrice > 0 && (
              <span className="text-sm text-primary font-bold">
                ${product.salePrice - product.discountPrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mb-2">
          <Button
            onClick={() => {
              setCurrentEditedId(product._id);
              setOpenCreateProductsDialog(true);
              setFormdata(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              deleteProduct(product._id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductsView;

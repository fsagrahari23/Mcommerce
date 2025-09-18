import React, { useEffect } from "react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CommonForm } from "@/components/common/Form";
import { productFormControls } from "@/config";
import ProductUpload from "@/components/adminView/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  addNewProduct,
  editProducts,

} from "@/store/admin-slice";

import { useToast } from "@/hooks/use-toast";
import AdminProductsView from "./ProductsView";

const initialFormData = {
  image: null,
  name: "",
  description: "",
  category: "",
  brand: "",
  salePrice: 0,
  discountPrice: 0,
  totalStock: 0,
};

const AdminProducts = () => {
  
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    React.useState(false);
  const [formdata, setFormdata] = React.useState(initialFormData);
  const [imageFile, setImageFile] = React.useState(null);
  const [upalodedImageUrl, setUploadedImageUrl] = React.useState("");
  const [Imageloading, setImageLoading] = React.useState(false);
  const { products } = useSelector((state) => state.adminProducts);
  const [currentEditedId, setCurrentEditedId] = React.useState(null);
  const [currentDeleteId, setCurrentDeleteId] = React.useState(null);

  console.log(currentDeleteId)

  const { toast } = useToast();
  // console.log(products);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    if (currentEditedId !== null) {
      dispatch(editProducts({ id: currentEditedId, formdata })).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setFormdata(initialFormData);
          setCurrentEditedId(null);
          toast({
            title: "Product updated successfully",
            type: "success",
          });
        }
      });
    } else {
      formdata.image = upalodedImageUrl;
      dispatch(addNewProduct(formdata)).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setFormdata(initialFormData);
          setImageFile(null);
          setUploadedImageUrl(null);
          toast({
            title: "Product added successfully",
            type: "success",
          });
        }
      });
    }
  };
  function isFormValid() {
    return (
      formdata.name !== "" &&
      formdata.description !== "" &&
      formdata.category !== "" &&
      formdata.brand !== "" &&
      formdata.salePrice !== 0 &&
      formdata.discountPrice !== 0 &&
      formdata.totalStock !== 0
    );
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add new Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <AdminProductsView
            key={product._id}
            product={product}
            setCurrentEditedId={setCurrentEditedId}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
            setFormdata={setFormdata}
            setCurrentDeleteId={setCurrentDeleteId}
          />
        ))}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormdata(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add new Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            upalodedImageUrl={upalodedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            laoding={Imageloading}
            setLoading={setImageLoading}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formData={formdata}
              setFormData={setFormdata}
              formControl={productFormControls}
              buttonText={currentEditedId ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;

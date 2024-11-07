import { addressFormControls } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CommonForm } from "../common/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "@/store/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./address-card";

const initialAddress = {
  address: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
  notes: "",
};

const Address = ({ setSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddress);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editedId, setEditedId] = useState(null);
  // console.log(user);
  const { addresses } = useSelector((state) => state.userAddress);

  const manageAddress = (e) => {
    e.preventDefault();
    if (editedId !== null) {
      dispatch(
        editAddress({ formData, userId: user.id, addId: editedId })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAddress({ userId: user.id }));
          setFormData(initialAddress);
          toast({
            title: "Address updated successfully",
            type: "success",
            variant: "success",
          });
          setEditedId(null);
        }
      });
    } else {
      if (addresses.length < 3) {
        dispatch(addAddress({ ...formData, userId: user.id })).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAddress({ userId: user.id }));
            setFormData(initialAddress);
            toast({
              title: "Address added successfully",
              type: "success",
              variant: "success",
            });
          }
        });
      } else {
        toast({
          title: "You can't add more than 3 addresses",
          type: "error",
          variant: "destructive",
        });
      }
    }
  };
  useEffect(() => {
    dispatch(fetchAddress({ userId: user.id }));
  }, [dispatch]);

  const handleDelete = (address) => {
    setFormData(initialAddress);
    setEditedId(null);
    alert("Are you sure you want to delete this address?");
    dispatch(
      deleteAddress({ userId: address.userId, addId: address._id })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAddress({ userId: address.userId }));
        toast({
          title: "Address deleted successfully",
          type: "success",
          variant: "destructive",
        });
      }
    });
  };
  const handleEdit = (address) => {
    setFormData({
      ...formData,
      address: address.address,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      phone: address.phone,
      notes: address.notes,
    });
    setEditedId(address._id);
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((value) => value);
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.length > 0 &&
          addresses.map((address) => (
            <AddressCard
              key={address._id}
              addressInfo={address}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
      </div>
      <CardHeader>
        <CardTitle>{editedId ? "Edit Address" : "Add new Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControl={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={manageAddress}
          buttonText={editedId ? "Edit" : "Add"}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;

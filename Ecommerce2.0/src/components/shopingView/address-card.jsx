import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { deleteAddress, fetchAddress } from "@/store/address-slice";
import { toast } from "@/hooks/use-toast";

function AddressCard({
  addressInfo,
  handleEdit,
  handleDelete,
  setSelectedAddress,
}) {
  return (
    <Card
      className="mt-3"
      onClick={() => {
        setSelectedAddress(addressInfo ? addressInfo : null);

        toast({
          title: "Address selected successfully",
          type: "success",
          variant: "success",
        });
      }}
    >
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>Pincode: {addressInfo.zipcode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <Button onClick={() => handleDelete(addressInfo)}>Delete</Button>
        <Button onClick={() => handleEdit(addressInfo)}>Edit</Button>
      </CardFooter>
    </Card>
  );
}
export default AddressCard;

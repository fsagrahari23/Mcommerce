import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductUpload = ({
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  laoding,
  setLoading,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  const uploadImageToCloudinary = async (image) => {
    setLoading(true);
    const data = new FormData();
    data.append("my_file", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload`,
        data
      );

      // Set the uploaded image URL once upload is successful
      if (response.data.success) {
        setUploadedImageUrl(response.data.result.url);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label
        className="text-sm mb-2 font-semibold block"
        htmlFor="image-upload"
      >
        Products Image
      </Label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setImageFile(e.dataTransfer.files[0]);
        }}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          name="my_file"
          className="hidden"
          ref={inputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={
              isEditMode
                ? `cursor-not-allowed flex flex-col items-center justify-center h-32`
                : ` flex flex-col items-center justify-center cursor-pointer h-32`
            }
          >
            <UploadCloudIcon
              size={30}
              className="w-10 h-10 text-muted-foreground mb-2"
            />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : laoding ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary h-8 mr-2 " />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="mt-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setImageFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductUpload;

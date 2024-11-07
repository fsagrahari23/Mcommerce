import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { categoryOptionsMap, brandOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ProductTile = ({ product, handlegetProduct, handleaddtocart }) => {
  
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handlegetProduct(product._id)}>
        <div className="relative">
          <Link to={product.image}>
            <img
              src={product.image}
              className="w-full h-[400px] rounded-t-lg  object-cover"
              alt={product.name}
            />
          </Link>

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.discountPrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.salePrice}
            </span>
            {product?.discountPrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice - product.discountPrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button
            className="w-full cursor-not-allowed"
            disabled
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              handleaddtocart(product._id, product?.totalStock);
            }}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductTile;

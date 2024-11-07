import ProductFilter from "@/components/shopingView/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchDetailedProducts,
} from "@/store/product-slice";
import ProductTile from "@/components/shopingView/ProductTile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { addToCart, fetchCart } from "@/store/cart-slice";
import { toast } from "@/hooks/use-toast";

export const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log(cartItems);
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const categorySearchPrams = searchParams.get("category");
  const handleSort = (value) => {
    console.log(value);
    setSort(value);
  };
  const createSearchParamsHelper = (filtersPrams) => {
    let queryString = [];
    for (const [key, value] of Object.entries(filtersPrams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryString.push(`${key}=${paramValue}`);
      }
    }
    return queryString.join("&");
  };
  const handleFilter = (getCurrentOption, getSectionId) => {
    // console.log(getCurrentOption, getSectionId);
    let cpyFilters = { ...filters };
    const idexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (idexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };
  const { productDetail } = useSelector((state) => state.shopProducts);

  const handlegetProduct = (id) => {
    dispatch(fetchDetailedProducts(id));
  };
  const handleaddtocart = (id, totalStock) => {
    console.log(cartItems, totalStock);
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
  useEffect(() => {
    if (productDetail !== null) {
      setOpenDialog(true);
    }
  }, [productDetail]);
  useEffect(() => {
    setSort("Price: Low to High");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchPrams]);
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4  border-b  flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => handleSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.label}
                      className="cursor-pointer"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsList?.map((product) => {
            return (
              <ProductTile
                handlegetProduct={handlegetProduct}
                key={product._id}
                product={product}
                handleaddtocart={handleaddtocart}
              />
            );
          })}
        </div>
      </div>
      <ProductDetails
        open={openDialog}
        setOpen={setOpenDialog}
        productDetail={productDetail}
      />
    </div>
  );
};

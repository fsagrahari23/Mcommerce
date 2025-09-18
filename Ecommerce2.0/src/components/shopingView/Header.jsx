import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"; // Ensure this path is correct
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shopingViewHeaderMenuItems } from "@/config/index";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { logOutUser } from "@/store/auth-slice";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import UserCartContent from "./CartItemContent";
import { useEffect, useState } from "react";
import { fetchCart } from "@/store/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const handleNavigate = (categoryItem) => {
    sessionStorage.removeItem("filters");

    const currenFilter =
      categoryItem.id !== "home" &&
      categoryItem.id !== "products" &&
      categoryItem.id !== "search"
        ? {
            category: [categoryItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currenFilter));
    if (location.pathname.includes("listedItem") && currenFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${categoryItem.id}`));
    } else {
      navigate(categoryItem.path);
    }
  };
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shopingViewHeaderMenuItems.map((item) => {
        return (
          <Label
            onClick={() => handleNavigate(item)}
            key={item.id}
            className="text-sm font-medium"
          >
            <span>{item.label}</span>
          </Label>
        );
      })}
    </nav>
  );
}
function HeaderRightContain() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);

  // const cart = cartItems.items;
  useEffect(() => {
    dispatch(fetchCart({ userId: user.id }));
  }, [dispatch, user.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Cart</span>
        </Button>
        <UserCartContent
          cartItems={cartItems}
          setOpenCartSheet={setOpenCartSheet}
          cart={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          openCartSheet={openCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold uppercase">
              {user?.username?.[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => dispatch(logOutUser())}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
const ShoppingHeader = () => {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce2.0</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden sm:block"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader className="border-b px-3 py-4">
              <MenuItems />
              <HeaderRightContain />
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContain />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;

import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const adminSideBarMEnuItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    name: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    name: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <BadgeCheck />,
  },
];
function MenuItems({ setOpen }) {
  const Navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSideBarMEnuItems.map((item) => {
        return (
          <div
            key={item.name}
            onClick={() => {
              setOpen ? setOpen(false) : null;
              Navigate(item.path);
            }}
            className="flex cursor-pointer text-sm items-center gap-2 rounded-md p-2 font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item.icons}
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
const AdminSidebar = ({ open, setOpen }) => {
  const Navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 ">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl cursor-pointer font-extrabold first-letter:">
                  Admin panel
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => Navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl cursor-pointer font-extrabold first-letter:">
            Admin panel
          </h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;

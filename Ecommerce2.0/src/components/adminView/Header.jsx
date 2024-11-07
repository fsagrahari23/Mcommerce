import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/auth-slice";

const AdminHeader = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b shadow-md">
      <Button onClick={() => setOpen(!open)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogOut}
          className="inline-flex gap-2 items-center rounded-md py-2 text-sm font-medium shadow-sm"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;

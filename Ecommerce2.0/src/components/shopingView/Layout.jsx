
import { Outlet } from "react-router-dom";
import ShopingHeader from "./Header";

const ShopingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header*/}
      <ShopingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShopingLayout;

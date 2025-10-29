import { Outlet } from "react-router-dom";
import Header from "./includes/Header";
import SideBar from "./includes/SideBar";

export const PrivateLayoutV2 = (): JSX.Element => {
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <SideBar />
      <div className="xl:col-span-5">
        <Header />
        <div className="h-[90vh] overflow-y-scroll py-2 px-8 relative overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

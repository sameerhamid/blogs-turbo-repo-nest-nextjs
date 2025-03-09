import React, { PropsWithChildren } from "react";
import Sidebar from "./ui/sidebar";
import { Bars3Icon } from "@heroicons/react/16/solid";

type Props = PropsWithChildren;
const MobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden ">
      <Sidebar
        triggerIcon={<Bars3Icon className="w-6" />}
        triggerClassName="absolute top-4 left-4"
      >
        {props.children}
      </Sidebar>
    </div>
  );
};

export default MobileNavbar;

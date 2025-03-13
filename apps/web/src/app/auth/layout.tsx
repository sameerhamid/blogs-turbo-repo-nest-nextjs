import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const AuthLayout = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      {props.children}
    </div>
  );
};

export default AuthLayout;

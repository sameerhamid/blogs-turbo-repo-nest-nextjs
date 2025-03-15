"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();
type Props = PropsWithChildren;
const Providers = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default Providers;

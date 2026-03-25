import { Navbar } from "@/components/layout/navbar";
import React from "react";
import { userService } from "../services/user.service";
import { Footer } from "@/components/layout/footer";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data: session } = await userService.getSession();

  return (
    <div className="mx-5">
      <Navbar session={session}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;

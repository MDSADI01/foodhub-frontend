import { Navbar } from "@/components/layout/navbar";
import React from "react";
import { userService } from "../services/user.service";
import { Footer } from "@/components/layout/footer";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data: session } = await userService.getSession();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar is fixed/sticky — rendered outside the flow */}
      <Navbar session={session} />

      {/* Main content — offset for fixed navbar */}
      <main className="flex-1 pt-24 lg:pt-28">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default CommonLayout;

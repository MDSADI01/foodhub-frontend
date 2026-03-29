import { userService } from "@/app/services/user.service";
import React from "react";

const AdminProfile = async () => {
  const { data } = await userService.getSession();
  const adminData = data?.user;

  if (!adminData) {
    return (
      <div className="font-bold">
        <p>No admin session found. Please login.</p>
      </div>
    );
  }

  return (
    <div className="font-bold">
      <p>Name : {adminData.name}</p>
      <p>Email : {adminData.email}</p>
    </div>
  );
};

export default AdminProfile;
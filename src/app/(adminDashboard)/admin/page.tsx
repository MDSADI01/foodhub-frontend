import { userService } from "@/app/services/user.service";
import React from "react";

const AdminProfile = async () => {
  const { data } = await userService.getSession();

  const adminData = data?.user;
  console.log(adminData);

  return <div>
    <div className="font-bold">
      <p>Name : {adminData.name}</p>
      <p>Email : {adminData.email}</p>
    </div>
  </div>;
};

export default AdminProfile;

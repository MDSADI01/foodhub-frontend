import { adminService } from "@/app/services/adminService";
import { ManageUsersStatusTable } from "@/components/ui/manageUsersStatusTable";
import React from "react";

const GetAllUsers = async () => {
  const getAllUsers = await adminService.getAllUsers();
  const usersList = getAllUsers?.data?.data || [];

  return <div>
    <ManageUsersStatusTable usersList={usersList}></ManageUsersStatusTable>
  </div>;
};

export default GetAllUsers;

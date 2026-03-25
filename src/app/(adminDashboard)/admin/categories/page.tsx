import { adminService } from "@/app/services/adminService";
import ManageCategory from "@/components/ui/manageCategory";
import ManageCategoryButton from "@/components/ui/manageCategoryButton";
import React from "react";

const ManageCategories = async () => {
  const categoryData = await adminService.getAllCategories();
  const categories = categoryData?.data?.data;

  return (
    <div>
      <div className="flex justify-center my-5">
        <ManageCategoryButton></ManageCategoryButton>
      </div>
      <ManageCategory categories={categories}></ManageCategory>
    </div>
  );
};

export default ManageCategories;

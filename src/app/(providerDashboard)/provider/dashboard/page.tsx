import { providerService } from "@/app/services/providerService";
import React from "react";

const Dashboard = async () => {
  const providerProfile = await providerService.getProviderProfile();
  const profile = providerProfile?.data?.data;

  if (!profile) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        No profile yet.
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl font-bold space-y-5">
        <p>Restaurant name: {profile.restaurantName}</p>
        <p>Description: {profile.description}</p>
        <p>Phone: {profile.phone}</p>
        <p>Total Meal: {profile.meals.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;
import { providerService } from "@/app/services/providerService";
import ManageMealButton from "@/components/ui/manageMealButton";
import { ProviderMealTable } from "@/components/ui/manageProviderMealTable";

const ManageMeals = async () => {
  // 1️⃣ Load provider profile
  const providerProfileRes = await providerService.getProviderProfile();
  const providerProfile = providerProfileRes?.data?.data;
  providerProfile;

  // 2️⃣ Load meals only if provider profile exists
  let providerMeals = [];
  if (providerProfile?.id) {
    const mealsRes = await providerService.getMealsByProvider();
    providerMeals = mealsRes?.data?.data || [];
  }

  return (
    <div className="p-5">
      {!providerProfile?.id ? (
        <div className="text-center text-red-600 font-bold my-5">
          You don’t have a provider profile yet. Please{" "}
          <a href="/provider/profile" className="text-blue-500 underline">
            create your profile
          </a>{" "}
          before adding meals.
        </div>
      ) : (
        <>
          <div className="flex justify-center my-5">
            <ManageMealButton />
          </div>
          <div>
            <ProviderMealTable providerMeal={providerMeals} />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageMeals;

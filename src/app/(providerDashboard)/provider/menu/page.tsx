
import { providerService } from "@/app/services/providerService";
import ManageMealButton from "@/components/ui/manageMealButton";
import { ProviderMealTable } from "@/components/ui/manageProviderMealTable";

const ManageMeals = async () => {
    const loadProviderMeals = await providerService.getMealsByProvider();
    const providerMeal = loadProviderMeals?.data?.data;
    console.log(providerMeal);

  return (
    <div>
      <div className="flex justify-center my-5">
        <ManageMealButton ></ManageMealButton>
      </div>
      <div>
        <ProviderMealTable providerMeal={providerMeal}></ProviderMealTable>
      </div>
      
    </div>
  );
};

export default ManageMeals;

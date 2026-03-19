import { mealService } from "@/app/services/meal.service";
import { MealType } from "@/app/types/mealType";
import MealCard from "@/components/ui/mealCard";

const Meal = async () => {
  const { data } = await mealService.getMeals();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-10 place-items-center">
        {data?.data?.map((meal: MealType) => {
          return <MealCard key={meal.id} meal={meal}></MealCard>;
        })}
    
      </div>
    </div>
  );
};

export default Meal;

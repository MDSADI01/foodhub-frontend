import MealPreview from "@/components/ui/homeMealCard";
import { Slider } from "@/components/ui/slider";
import { mealService } from "../services/meal.service";

export default async function Home() {
  const MealsPreview = await mealService.getMeals();
  const meals = MealsPreview?.data?.data;
  console.log(meals);
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <Slider></Slider>
        </div>
        <div className="flex justify-center">
          <MealPreview meals={meals}></MealPreview>
        </div>
      </div>
    </div>
  );
}

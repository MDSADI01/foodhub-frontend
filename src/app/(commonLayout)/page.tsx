import MealPreview from "@/components/ui/homeMealCard";
import { Slider } from "@/components/ui/slider";
import { mealService } from "../services/meal.service";
import Marquees from "@/components/ui/marquee";
import SocialMediaCards from "@/components/ui/socialMediaCard";

export default async function Home() {
  const MealsPreview = await mealService.getMeals();
  const meals = MealsPreview?.data?.data;
  
  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-center">
          <Slider></Slider>
        </div>
        <div className="flex justify-center">
          <MealPreview meals={meals}></MealPreview>
        </div>
        <h1 className="font-bold text-center text-2xl my-10">
          Our Associated Companies
        </h1>
        <div className="flex justify-center">
          <Marquees></Marquees>
        </div>
        <div className="flex justify-center">
          <SocialMediaCards></SocialMediaCards>
        </div>
      </div>
    </div>
  );
}

import { mealService } from "@/app/services/meal.service";
import { MealType } from "@/app/types/mealType";
import { InfiniteMealList } from "@/components/ui/infinite-meal-list";
import { MealFilters } from "@/components/ui/meal-filters";
import { FadeIn } from "@/components/ui/fade-in";

const Meal = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const { data } = await mealService.getMeals();
  let meals = data?.data || [];

  // Client-side filtering simulation since service doesn't support it yet
  const search =
    typeof params.search === "string" ? params.search.toLowerCase() : "";
  const category =
    typeof params.category === "string" ? params.category : "all";
  const sort = typeof params.sort === "string" ? params.sort : "newest";

  if (search) {
    meals = meals.filter(
      (m: MealType) =>
        m.name.toLowerCase().includes(search) ||
        m.description?.toLowerCase().includes(search),
    );
  }

  if (category !== "all") {
    // Assuming meal has a category field, if not, this is just for UI demonstration
    // meals = meals.filter((m: any) => m.category === category);
  }

  if (sort === "price-low") {
    meals = [...meals].sort((a: MealType, b: MealType) => a.price - b.price);
  } else if (sort === "price-high") {
    meals = [...meals].sort((a: MealType, b: MealType) => b.price - a.price);
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col gap-2 mb-8">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl font-bold tracking-tight">Explore Our Menu</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-muted-foreground">
            Discover delicious meals from the best local restaurants.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <MealFilters />
      </FadeIn>

      <InfiniteMealList initialMeals={meals} />
    </div>
  );
};

export default Meal;

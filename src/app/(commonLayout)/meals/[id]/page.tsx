import { mealService } from "@/app/services/meal.service";
import { reviewService } from "@/app/services/review.service";
import { userService } from "@/app/services/user.service";
import { AddCart } from "@/components/ui/add-to-cart";
import ReviewInput from "@/components/ui/review-input";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  MapPin,
  ChefHat,
  ShieldCheck,
  Info,
  MessageSquare,
  Utensils,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import MealCard from "@/components/ui/mealCard";
import { MealType } from "@/app/types/mealType";

const MealPortal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const mealId = id;
  const { data } = await mealService.getMealsById(mealId);
  const { data: allMealsData } = await mealService.getMeals();

  const mealDetails = data?.data;
  if (!mealDetails) return <div>Meal not found</div>;

  const { name, price, imageUrl, description, provider } = mealDetails;
  const { restaurantName } = provider;

  const mealAllReviews = await reviewService.getAllReviewByMealId(mealId);
  const reviews = mealAllReviews?.data?.data || [];

  // Mocking related items
  const relatedMeals = allMealsData?.data?.slice(0, 4) || [];

  return (
    <div className="container mx-auto px-4 pt-28 pb-16 space-y-16">
      {/* Hero / Main Info Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[4/3] max-h-[420px] w-full overflow-hidden rounded-3xl shadow-2xl border mx-auto">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            src={imageUrl}
            alt={name}
          />
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary/90 backdrop-blur-md px-4 py-2 text-sm">
              Popular Choice
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <ChefHat className="w-5 h-5" />
              <span>{restaurantName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {name}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-foreground">4.8</span>
                <span>({reviews.length} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>20-30 min</span>
              </div>
            </div>
          </div>

          <div className="text-4xl font-bold text-primary">৳{price}</div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Info className="w-5 h-5" />
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {description ||
                "Enjoy our specially crafted " +
                  name +
                  " made with the freshest ingredients and authentic spices. Perfectly cooked to satisfy your cravings and provide a delightful dining experience at home."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <AddCart mealDetails={mealDetails} />
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <ShieldCheck className="w-5 h-5" />
              Safe & Contactless Delivery
            </div>
          </div>
        </div>
      </section>

      {/* Specifications / Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Utensils,
            label: "Dietary Info",
            value: "Vegetarian, Gluten-Free",
          },
          {
            icon: MapPin,
            label: "Restaurant Location",
            value: "Downtown, Food Street",
          },
          {
            icon: ShieldCheck,
            label: "Quality Check",
            value: "A+ Rated Kitchen",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-6 bg-muted/50 rounded-2xl border"
          >
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-sm">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="font-bold">{item.value}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Reviews Section */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b pb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="w-8 h-8" />
            Customer Reviews
          </h2>
          <ReviewInput mealId={mealId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews && reviews.length > 0 ? (
            reviews.map((review: any) => (
              <div
                key={review.id}
                className="p-8 bg-card rounded-2xl border shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">
                      {review.customer?.name || "Anonymous User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified Purchase
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-xl font-medium text-muted-foreground">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Items Section */}
      {relatedMeals.length > 0 && (
        <section className="space-y-10">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Utensils className="w-8 h-8" />
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedMeals.map((meal: MealType) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MealPortal;

import { mealService } from "@/app/services/meal.service";
import { reviewService } from "@/app/services/review.service";
import { userService } from "@/app/services/user.service";
import { AddCart } from "@/components/ui/add-to-cart";
import ReviewInput from "@/components/ui/review-input";

const MealPortal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const mealId = id;
  const { data } = await mealService.getMealsById(mealId);

  const mealDetails = data?.data;
  console.log(mealDetails);

  const { name, price, imageUrl, description, provider } = mealDetails;
  const { restaurantName } = provider;
  

  const mealAllReviews = await reviewService.getAllReviewByMealId(mealId);

  const reviews = mealAllReviews?.data?.data;
  console.log(reviews);

  


 
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl py-4">
        <div className="place-items-center">
          <img
            className="rounded-4xl w-90 h-80 my-10 object-cover"
            src={imageUrl}
          />
        </div>
        <div className="font-bold text-left my-auto space-y-4">
          <p>Name of dish : {name}</p>
          <p>Price: {price} ৳</p>
          <p>Description: {description}</p>

          <p>{restaurantName}</p>
          <div>
            <AddCart mealDetails={mealDetails}></AddCart>
          </div>
        </div>
      </div>
      <div className="text-center grid place-items-center my-20 ">
        <ReviewInput mealId={mealId}></ReviewInput>
      </div>
      <div className="space-y-6 px-4 md:px-10">
        {reviews && reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div
              key={review.id}
              className="border p-4 rounded-xl shadow-md"
            >
              <p className="font-semibold">
                {review.customer?.name || "Anonymous"}
              </p>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default MealPortal;

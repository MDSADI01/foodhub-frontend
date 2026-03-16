import { mealService } from "@/app/services/meal.service";

import React from "react";

const MealPortal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await mealService.getMealsById(id);

  const singleMeal = data?.data;
  console.log(singleMeal);

  const { name, price, imageUrl, description, provider } = singleMeal;
  const { restaurantName } = provider;

  return (
    <div>
      <div className="flex justify-center items-center my-12">
        <div className="place-items-center">
          <img className="rounded-4xl w-11/12 " src={imageUrl} />
        </div>
        <div className="w-full ">
          <div>{name}</div>
          <div>Price: {price} ৳</div>
          <div>
            Description:
            {description}
          </div>
          <div>{restaurantName}</div>
        </div>
      </div>
    </div>
  );
};

export default MealPortal;

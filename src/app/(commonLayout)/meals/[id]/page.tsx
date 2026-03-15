import { mealService } from "@/app/services/meal.service";

import React from "react";

const MealPortal = async ({ params }: { params: Promise<{ id: string }> }) => {

    
  const { id } = await params;
  const { data } = await mealService.getMealsById(id)

  const singleMeal = data?.data;

const {name,price,imageUrl,description} = singleMeal;



  

  return <div>
    <div>
      <div>
       <img src={imageUrl} />
      </div>
      <div>
        <div>{name}</div>
        <div>{price}</div>
        <div></div>
      </div>
    </div>
  </div>;
};

export default MealPortal;

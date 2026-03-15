// "use client";

// import React, { useState } from "react";
// import { useCart } from "@/app/context/cart-context";

// type Meal = {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   imageUrl?: string;
//   isAvailable: boolean;
//   category: { name: string };
//   provider: { restaurantName: string };
//   reviews?: { rating: number; comment?: string }[];
// };

// type Props = {
//   meal: Meal;
// };

// export default function MealDetailCard({ meal }: Props) {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   const increment = () => setQuantity((q) => q + 1);
//   const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

//   const averageRating =
//     meal.reviews && meal.reviews.length > 0
//       ? (
//           meal.reviews.reduce((acc, r) => acc + r.rating, 0) /
//           meal.reviews.length
//         ).toFixed(1)
//       : "N/A";

//   return (
//     <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8 border rounded-lg shadow-lg">
      
//       {/* Image */}
//       <div className="md:w-1/2">
//         <img
//           src={meal.imageUrl || "/placeholder.png"}
//           alt={meal.name}
//           className="w-full h-80 object-cover rounded-lg"
//         />
//       </div>

//       {/* Meal Info */}
//       <div className="md:w-1/2 flex flex-col gap-4">
//         <h1 className="text-3xl font-bold">{meal.name}</h1>

//         <p className="text-gray-600">
//           Category: <span className="font-semibold">{meal.category.name}</span>
//         </p>

//         <p className="text-gray-600">
//           Restaurant:{" "}
//           <span className="font-semibold">{meal.provider.restaurantName}</span>
//         </p>

//         <p className="text-green-600 font-semibold text-2xl">${meal.price}</p>

//         <p className="text-gray-700">{meal.description}</p>

//         {/* Reviews */}
//         <p className="text-gray-600">
//           Rating: <span className="font-semibold">{averageRating} ⭐</span> (
//           {meal.reviews?.length || 0} reviews)
//         </p>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-4 mt-2">
//           <button
//             onClick={decrement}
//             className="px-3 py-1 bg-gray-200 rounded"
//           >
//             -
//           </button>
//           <span>{quantity}</span>
//           <button
//             onClick={increment}
//             className="px-3 py-1 bg-gray-200 rounded"
//           >
//             +
//           </button>
//         </div>

//         {/* Add to Cart */}
//         <button
//           onClick={() => addToCart(meal, quantity)}
//           disabled={!meal.isAvailable}
//           className={`mt-4 py-2 px-6 rounded ${
//             meal.isAvailable ? "bg-black text-white" : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {meal.isAvailable ? `Add ${quantity} to Cart` : "Unavailable"}
//         </button>
//       </div>
//     </div>
//   );
// }
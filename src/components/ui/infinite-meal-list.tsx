"use client";

import { useState, useEffect } from "react";
import { MealType } from "@/app/types/mealType";
import MealCard from "@/components/ui/mealCard";
import InfiniteScroll from "react-infinite-scroll-component";

export function InfiniteMealList({ initialMeals }: { initialMeals: MealType[] }) {
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    setDisplayCount(8); // Reset on initialMeals change (like filtering)
  }, [initialMeals]);

  if (initialMeals.length === 0) {
    return (
      <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed">
        <h3 className="text-xl font-semibold mb-2">No meals found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  const fetchMoreData = () => {
    // a short timeout to simulate a network request feel
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 8, initialMeals.length));
    }, 500);
  };

  const displayedMeals = initialMeals.slice(0, displayCount);

  return (
    <InfiniteScroll
      dataLength={displayedMeals.length}
      next={fetchMoreData}
      hasMore={displayCount < initialMeals.length}
      loader={
        <div className="flex w-full justify-center p-8 mt-4">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      }
      endMessage={
        <div className="text-center py-8">
          <p className="text-muted-foreground font-medium">
            You've reached the end of the menu!
          </p>
        </div>
      }
      style={{ overflow: 'visible' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

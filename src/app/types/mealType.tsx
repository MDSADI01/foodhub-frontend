export interface MealType {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    providerId: string;
    categoryId: string;
    createdAt: string; 
    updatedAt: string; 
    provider:{
      restaurantName: string;
    }
  }
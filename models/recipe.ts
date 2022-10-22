import { Ingredient } from "./ingredient";

export interface Recipe {
  id?: number;
  name: string;
  image: string;
  persons: number;
  cookingTime: number;
  ingredients: { quantity: number; ingredient: Ingredient }[];
  instructions: string[];
  kcal: number;
}

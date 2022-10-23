import { Ingredient } from "./ingredient";

export interface Recipe {
  id?: number;
  name: string;
  category: string;
  kcal: number;
  image: string;
  url: string;
  persons: number;
  cookingTime: number;
  ingredients: { quantity: number; ingredient: Ingredient}[];
  instructions: string[];
}

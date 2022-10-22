export interface Recipe {
  id?: number;
  name: string;
  category: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  kcal: number;
}

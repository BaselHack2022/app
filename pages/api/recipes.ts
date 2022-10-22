// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe } from '../../models/recipe'

import path from 'path';
import { promises as fs } from 'fs';
import { Ingredient } from '../../models/ingredient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Recipe>>
) {

  const jsonDirectory = path.join(process.cwd(), 'json');
  const receipes = JSON.parse(await fs.readFile(jsonDirectory + '/recipes.json', 'utf8'));
  const fridgeItems = req.body as Ingredient[];
  const fridgeItemNames = fridgeItems.map(i => i.name.toLowerCase())
  
  let recipeList: Array<Recipe> = receipes.filter((receipe: Recipe) => receipe.ingredients.every(item => fridgeItemNames.some(fi => item.name.toLowerCase().includes(fi))))

  res.status(200).send(recipeList)
}

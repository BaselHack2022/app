// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe } from '../../models/recipe'

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Recipe>>
) {

  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/recipes.json', 'utf8');
  const objData = JSON.parse(fileContents)

  if (req.method === "POST") {
    // TODO: Verify request and handle request data
    console.log(req.body)
    
    res.json(objData)
    
  } else {
    res.status(405)
  }
}
import { Container, Grid, Image, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import { Recipe } from "../../models/recipe";

const RecipeDetails: NextPage = () => {
  const recipe: Recipe = {
    id: 1,
    name: "Spaghetti Carbonara",
    image:
      "https://assets.marthastewart.com/styles/wmax-750/d10/main_01354/main_01354_horiz.jpg?itok=CRVZzWSG",
    category: "Pasta",
    ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan Cheese"],
    instructions: [
      "Cook pasta according to package directions.",
      "Meanwhile, in a large skillet, cook bacon over medium heat until crisp. Remove to paper towels to drain, reserving 1 tablespoon drippings in skillet.",
      "Whisk eggs, cream, and garlic in a large bowl. Season with salt and pepper. Add pasta and bacon to egg mixture; toss to coat. Sprinkle with cheese and parsley.",
      "Transfer to a serving bowl and serve immediately.",
    ],
    kcal: 3000,
  };

  return (
    <Layout>
      <Container fluid>
        <Grid.Container>
          <Grid xs={12}>
            <Image
              height={200}
              src={recipe.image}
              alt={recipe.name}
              objectFit="cover"
            />
          </Grid>
          <Grid xs={12}>
            <Text
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
              h2
            >
              {recipe.name}
            </Text>
          </Grid>
          <Grid xs={12}>
            <div>
              <Text h3>Ingredients</Text>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid xs={12}>
            <div>
              <Text h3>Instructions</Text>
              <ol>
                {recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
};

export default RecipeDetails;

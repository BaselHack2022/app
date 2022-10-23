import { Container, Grid, Image, Link, Text } from "@nextui-org/react";
import { NextPage } from "next";
import path from "path";
import IngredientsTable from "../../components/IngredientsTable";
import { Layout } from "../../components/Layout";
import { Recipe } from "../../models/recipe";
import { promises as fs } from "fs";

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(
    jsonDirectory + "/recipes.json",
    "utf8"
  );
  const recipe = JSON.parse(fileContents)[context.query.id];

  // Pass data to the page via props
  return { props: { recipe } };
}

const RecipeDetails: NextPage<{ recipe: Recipe }> = ({ recipe }) => {
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
            <Link isExternal href={recipe.url}>
              Rezept
            </Link>
          </Grid>
          <Grid xs={12}>
            <IngredientsTable
              ingredients={recipe.ingredients}
              persons={recipe.persons}
            />
          </Grid>
          <Grid xs={12}>
            <div>
              <Text h3>Anleitung</Text>
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

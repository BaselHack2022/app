import { Container, Text, Grid } from "@nextui-org/react";
import { NextPage } from "next";
import path from "path";
import React from "react";
import { Layout } from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../models/recipe";
import { promises as fs } from "fs";

export async function getServerSideProps() {
  // Fetch data from external API
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(
    jsonDirectory + "/recipes.json",
    "utf8"
  );
  const recipes = JSON.parse(fileContents);

  // Pass data to the page via props
  return { props: { recipes } };
}

const Recipes: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <Layout>
      <Container>
        <Grid.Container gap={1} justify="center">
          <Grid xs={12}>
            <Text
              h3
              css={{
                textGradient: "45deg, $blue600 -20%, $green600 50%",
                textAlign: "center",
                paddingTop: "1rem",
              }}
            >
              Rezepte
            </Text>
          </Grid>
          {recipes.map((recipe, index) => (
            <Grid xs={12} key={index}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </Layout>
  );
};

export default Recipes;

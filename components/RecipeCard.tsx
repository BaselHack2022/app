import React from "react";
import { Card, Col, Text } from "@nextui-org/react";
import { Recipe } from "../models/recipe";
import { useRouter } from "next/router";

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();
  return (
    <Card
      isPressable
      onPress={() => {
        router.push("/recipes/" + recipe.id);
      }}
    >
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            {recipe.category}
          </Text>
          <Text h4 color="white">
            {recipe.name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src={recipe.image}
        objectFit="cover"
        width="100%"
        height={150}
        alt={recipe.name}
      />
    </Card>
  );
};

export default RecipeCard;

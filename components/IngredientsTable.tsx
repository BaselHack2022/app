import React, { useState } from "react";
import { Button, Grid, Input, Table } from "@nextui-org/react";
import { Ingredient } from "../models/ingredient";

export interface IngredientsTableProps {
  ingredients: { quantity: number; ingredient: Ingredient }[];
  persons: number;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({
  ingredients,
  persons: p,
}) => {
  const [persons, setPersons] = useState<number>(p);

  return (
    <Grid.Container gap={1}>
      <Grid xs={12}>
        <Table
          css={{
            height: "auto",
            width: 300,
          }}
        >
          <Table.Header>
            <Table.Column>
              <Grid.Container>
                <Grid>Anzahl</Grid>
              </Grid.Container>
            </Table.Column>
            <Table.Column>Zutaten</Table.Column>
          </Table.Header>
          <Table.Body>
            {ingredients.map((ingredient) => (
              <Table.Row key={ingredient.ingredient.id}>
                <Table.Cell>{(ingredient.quantity / p) * persons}x</Table.Cell>
                <Table.Cell>{ingredient.ingredient.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid>
    </Grid.Container>
  );
};

export default IngredientsTable;
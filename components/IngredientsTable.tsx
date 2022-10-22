import React, { useState } from "react";
import { Grid, Input, Table } from "@nextui-org/react";
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
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Input
          label="Personen"
          type="number"
          placeholder={persons.toString()}
          onInput={(e) => setPersons(Number(e.currentTarget.value))}
        />
      </Grid>
      <Grid xs={12}>
        <Table
          css={{
            height: "auto",
            width: 300,
          }}
        >
          <Table.Header>
            <Table.Column>Anzahl</Table.Column>
            <Table.Column>Zutat</Table.Column>
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

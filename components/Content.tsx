import {
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Row,
  Text,
  useModal,
} from "@nextui-org/react";
import { useState } from "react";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import RecipeCard from "./RecipeCard";

export const Content = () => {
  const { setVisible, bindings } = useModal();

  const ingredients: Ingredient[] = [
    {
      id: 1,
      name: "Orange",
      image: "/images/fruit-1.jpeg",
      kcal: 30,
    },
    {
      id: 2,
      name: "Tangerine",
      image: "/images/fruit-2.jpeg",
      kcal: 30,
    },
    {
      id: 3,
      name: "Cherry",
      image: "/images/fruit-3.jpeg",
      kcal: 30,
    },
    {
      id: 4,
      name: "Lemon",
      image: "/images/fruit-4.jpeg",
      kcal: 30,
    },
    {
      id: 5,
      name: "Avocado",
      image: "/images/fruit-5.jpeg",
      kcal: 30,
    },
    {
      id: 6,
      name: "Lemon 2",
      image: "/images/fruit-6.jpeg",
      kcal: 30,
    },
    {
      id: 7,
      name: "Banana",
      image: "/images/fruit-7.jpeg",
      kcal: 30,
    },
    {
      id: 8,
      name: "Watermelon",
      image: "/images/fruit-8.jpeg",
      kcal: 30,
    },
  ];

  const [selected, setSelected] = useState<number[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([
    {
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
    },
  ]);

  const handleSelect = (index: any) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
      return;
    }
    setSelected((prev) => [...prev, index]);
  };

  return (
    <Container fluid>
      <Text
        h3
        css={{
          textGradient: "45deg, $blue600 -20%, $green600 50%",
          textAlign: "center",
          paddingTop: "1rem",
        }}
      >
        Choose your ingredients!
      </Text>
      <Grid.Container gap={1} css={{ marginBottom: 20, marginTop: 10 }}>
        {ingredients.map((item, index) => (
          <Grid xs={6} key={index}>
            <Card
              isPressable
              onPress={() => handleSelect(index)}
              css={{
                borderWidth: 5,
                borderColor: selected.includes(index)
                  ? "var(--nextui-colors-blue600)"
                  : "transparent",
                borderStyle: "solid",
              }}
            >
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={"https://nextui.org" + item.image}
                  objectFit="cover"
                  width="100%"
                  height={140}
                  alt={item.name}
                />
              </Card.Body>
              <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                  <Text b>{item.name}</Text>
                  <Text
                    css={{
                      color: "$accents7",
                      fontWeight: "$semibold",
                      fontSize: "$sm",
                    }}
                  >
                    {item.kcal} kcal
                  </Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <Card
        style={{
          position: "sticky",
          bottom: 10,
          width: "100%",
          margin: 0,
        }}
      >
        <Card.Body>
          <Grid.Container justify="center" gap={1}>
            <Grid xs={6}>
              <Text size={18} weight="bold" css={{ verticalAlign: "middle" }}>
                {selected.length} selected
              </Text>
            </Grid>
            <Grid xs={6}>
              <Button
                color="gradient"
                auto
                disabled={selected.length === 0}
                style={{ width: "100%" }}
                onPress={() => setVisible(true)}
              >
                Go
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>

      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-name"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-name" size={18}>
            Recommended Recipes
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={1}>
            {recommendedRecipes.map((item) => (
              <Grid xs={12} key={item.id}>
                <RecipeCard recipe={item} />
              </Grid>
            ))}
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

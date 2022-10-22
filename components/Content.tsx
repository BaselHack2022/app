import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Modal,
  Row,
  Spacer,
  Text,
  Image,
  useModal,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import RecipeCard from "./RecipeCard";

export const Content = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    fetch("/api/ingredients").then((res) => {
      res.json().then((data) => {
        setIngredients(
          data.map((item: Ingredient) => {
            const { id } = item;
            if (!id) return item;
            if (window.localStorage.getItem(id.toString())) {
              item.stock = parseInt(
                window.localStorage.getItem(id.toString()) || "0"
              );
            } else {
              window.localStorage.setItem(id.toString(), "0");
            }
            return item;
          })
        );
      });
    });

    return () => {
      ingredients;
    };
  }, []);

  const { setVisible, bindings } = useModal();
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);

  const updateStock = async (ingredient: Ingredient, stock: number) => {
    if (!ingredient.id) {
      return;
    }
    ingredient.stock = stock;
    localStorage.setItem(ingredient.id.toString(), ingredient.stock.toString());
    setIngredients(
      ingredients.map((i) => (i.id === ingredient.id ? ingredient : i))
    );
  };

  const handleSubmit = () => {
    fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(ingredients.filter((i) => i.stock > 0)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecommendedRecipes(data);
        setVisible(true);
      });
  };

  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Container fluid>
        <Text
          h3
          css={{
            textGradient: "45deg, $blue600 -20%, $green600 50%",
            textAlign: "center",
            paddingTop: "1rem",
          }}
        >
          Dein Kühlschrank
        </Text>

        <Grid.Container gap={1} css={{ marginBottom: 20, marginTop: 10 }}>
          {ingredients
            .filter((item) => item.stock > 0)
            .map((item, index) => (
              <Grid xs={6} key={"stock-" + index}>
                <Card
                  isPressable
                  onPress={() => updateStock(item, item.stock - 1)}
                  css={{
                    borderWidth: 5,
                    borderColor: "transparent",
                    borderStyle: "solid",
                  }}
                >
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={item.image}
                      objectFit="cover"
                      width="100%"
                      height={140}
                      alt={item.name}
                      showSkeleton
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
                        {item.stock}x
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
        </Grid.Container>

        <Spacer />

        <Text
          h3
          css={{
            textGradient: "45deg, $red600 -20%, $yellow600 50%",
            textAlign: "center",
            paddingTop: "1rem",
          }}
        >
          Hinzufügen
        </Text>

        <Input
          size="lg"
          placeholder="Suchen"
          css={{ width: "100%" }}
          onInput={(e) => setSearch(e.currentTarget.value)}
        />

        <Grid.Container gap={1} css={{ marginBottom: 20, marginTop: 10 }}>
          {ingredients
            .filter(
              (i) =>
                search.length === 0 ||
                i.name.toLowerCase().match(search.toLowerCase())
            )
            .map((item, index) => (
              <Grid xs={6} key={index}>
                <Card
                  isPressable
                  onPress={() => updateStock(item, item.stock + 1)}
                  css={{
                    borderWidth: 5,
                    borderColor: "transparent",
                    borderStyle: "solid",
                  }}
                >
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={item.image}
                      objectFit="cover"
                      width="100%"
                      height={140}
                      alt={item.name}
                      showSkeleton
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
                        {item.stock}x
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
        </Grid.Container>

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
              Empfohlene Rezepte
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
              Schliessen
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Card
        style={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          margin: 0,
          padding: 5,
        }}
      >
        <Card.Body>
          <Grid.Container justify="center" gap={1}>
            <Grid xs={6}>
              <Button
                color="primary"
                auto
                style={{ width: "100%" }}
                onPress={() => handleSubmit()}
              >
                <Image
                  src="/112-book-morph-outline.gif"
                  height={40}
                  width={40}
                  alt=""
                />
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button
                color="primary"
                auto
                style={{ width: "100%" }}
                onPress={() => handleSubmit()}
              >
                <Image
                  src="/139-basket-outline.gif"
                  height={40}
                  width={40}
                  alt=""
                />
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </>
  );
};

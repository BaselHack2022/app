import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Input,
  Spacer,
  Text,
  useModal,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import BillRecognitionModal from "./BillRecognitionModal";
import IngredientCard from "./IngredientCard";
import IngredientsRecognitionModal from "./IngredientsRecognitionModal";
import RecipesModal from "./RecipesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

export const Content = () => {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    fetch("/api/ingredients").then((res) => {
      res.json().then((data) => {
        setIngredients(
          data.map((item: Ingredient) => {
            const { id } = item;
            item.stock = 0;
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
  const { setVisible: setVisibleImage, bindings: bindingsImage } = useModal();
  const { setVisible: setVisibleBill, bindings: bindingsBill } = useModal();
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
      body: JSON.stringify(ingredients.filter((i) => i.stock && i.stock > 0)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecommendedRecipes(data);
        setVisible(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  };

  const [isLoading, setIsLoading] = useState(true);

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
            .filter((item) => item.stock !== undefined && item.stock > 0)
            .map((item, index) => (
              <Grid xs={6} key={"stock-" + index}>
                <IngredientCard
                  item={item}
                  onPress={() => {
                    if (item && item.stock !== undefined) updateStock(item, item.stock - 1);
                  }}
                />
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
              <Grid xs={6} key={"available-" + index}>
                <IngredientCard
                  item={item}
                  onPress={() => {
                    if (item && item.stock !== undefined) updateStock(item, item.stock + 1);
                  }}
                />
              </Grid>
            ))}
        </Grid.Container>

        <RecipesModal
          isLoading={isLoading}
          recommendedRecipes={recommendedRecipes}
          bindings={bindings}
          setVisible={setVisible}
        />

        <IngredientsRecognitionModal
          setVisible={setVisibleImage}
          bindings={bindingsImage}
          ingredients={ingredients}
        />

        <BillRecognitionModal
          setVisible={setVisibleBill}
          bindings={bindingsBill}
          ingredients={ingredients}
        />
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
            <Grid xs={4}>
              <Button
                color="gradient"
                auto
                style={{ width: "100%" }}
                onPress={() => handleSubmit()}
              >
                Rezepte
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button
                color="secondary"
                auto
                style={{ width: "100%" }}
                onPress={() => setVisibleBill(true)}
              >
                <FontAwesomeIcon icon={faFileInvoice} />
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button
                color="primary"
                auto
                style={{ width: "100%" }}
                onPress={() => setVisibleImage(true)}
              >
                <FontAwesomeIcon icon={faCamera} />
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </>
  );
};

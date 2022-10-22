import {
    Button, Grid, Image, Modal, Text
} from "@nextui-org/react";
import React from "react";
import { Recipe } from "../models/recipe";
import RecipeCard from "./RecipeCard";

export interface RecipesModalProps {
  isLoading?: boolean;
  recommendedRecipes: Recipe[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
}

const RecipesModal: React.FC<RecipesModalProps> = ({
  isLoading,
  recommendedRecipes,
  setVisible,
  bindings,
}) => {
  return (
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
        {isLoading ? (
          <Image src="/fridge.gif" alt="Loading" />
        ) : (
          <Grid.Container gap={1}>
            {recommendedRecipes.map((item) => (
              <Grid xs={12} key={item.id}>
                <RecipeCard recipe={item} />
              </Grid>
            ))}
          </Grid.Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button flat auto color="error" onClick={() => setVisible(false)}>
          Schliessen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipesModal;

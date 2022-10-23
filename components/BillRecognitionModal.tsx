import { Button, Image, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import Webcam from "react-webcam";

import { Ingredient } from "../models/ingredient";
import IngredientCard from "./IngredientCard";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const WebcamCapture: React.FC<{ ingredients: Ingredient[] }> = ({
  ingredients: ing,
}) => {
  const [ingredients, setIngredients] = useState(ing);

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

  const [image, setImage] = useState<string>("");
  const [predictions, setPredictions] = useState<string[]>([]);

  const predict = async (imageSrc: string) => {
    fetch("/api/ocr", {
      method: "POST",
      body: JSON.stringify({ image: imageSrc }),
    })
      .then((res) => res.json())
      .then((data) =>
        setPredictions(
          (data.text.toLowerCase().replace(/ü/g, "u") || "").split(/[\n\s]/)
        )
      );
  };

  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(async () => {
    if (webcamRef.current && webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc as string);
      predict(imageSrc as string);
    }
  }, [webcamRef]);
  return (
    <>
      <Webcam
        audio={false}
        height={250}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <Button onClick={capture}>Aufnahme</Button>

      {/* {predictions.join(", ")} */}

      {predictions.length > 0 &&
        ingredients
          .map((i) => ({ ...i, name: i.name.replace(/ü/g, "u") }))
          .filter((i) =>
            predictions
              .map((i) => i.trim())
              .includes(i.name.toLowerCase().trim())
          )
          .map((ingredient) => (
            <IngredientCard
              item={ingredient}
              key={ingredient.id}
              onPress={() => updateStock(ingredient, ingredient.stock + 1)}
            />
          ))}

      <Image
        style={{ display: "none" }}
        css={{ visibility: "hidden" }}
        id="testImage"
        src={image}
        alt={""}
        width={250}
        height={250}
      />
    </>
  );
};

export interface IngredientsRecognitionModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  ingredients: Ingredient[];
}

const IngredientsRecognitionModal: React.FC<
  IngredientsRecognitionModalProps
> = ({ setVisible, bindings, ingredients }) => {
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
          Erkenne Zutaten
        </Text>
      </Modal.Header>
      <Modal.Body>
        <WebcamCapture ingredients={ingredients} />
      </Modal.Body>
      <Modal.Footer>
        <Button flat auto color="error" onPress={() => setVisible(false)}>
          Schliessen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IngredientsRecognitionModal;

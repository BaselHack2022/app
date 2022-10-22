import { Button, Image, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import Webcam from "react-webcam";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { Ingredient } from "../models/ingredient";
import IngredientCard from "./IngredientCard";

const cocoSsd = require("@tensorflow-models/coco-ssd");

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const WebcamCapture: React.FC<{ ingredients: Ingredient[] }> = ({
  ingredients,
}) => {
  const [image, setImage] = useState<string>("");
  const [predictions, setPredictions] = useState<
    { class: string; score: number }[]
  >([]);

  const predict = async () => {
    const img = document.getElementById("testImage") as HTMLImageElement;

    // Load the model.
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await model.detect(img);
    console.log(predictions);
    setPredictions(predictions);
  };

  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(async () => {
    if (webcamRef.current && webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc as string);
      predict();
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
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.class}>
            {prediction.class} - {Math.round(prediction.score * 100)}%
          </li>
        ))}
      </ul>
      {ingredients
        .filter((i) =>
          predictions
            .map((p) => p.class.toLowerCase())
            .includes(i.name.toLowerCase())
        )
        .map((ingredient) => (
          <IngredientCard item={ingredient} key={ingredient.id} />
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
        <Button flat auto color="error" onClick={() => setVisible(false)}>
          Schliessen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IngredientsRecognitionModal;

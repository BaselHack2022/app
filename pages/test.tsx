import { Button, Image } from "@nextui-org/react";
import { NextPage } from "next";
import React, { useState } from "react";
import Webcam from "react-webcam";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

const cocoSsd = require("@tensorflow-models/coco-ssd");

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = () => {
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
        height={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
      />

      <Image id="testImage" src={image} alt={""} width={250} height={250} />

      <Button onClick={capture}>Capture photo</Button>
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.class}>
            {prediction.class} - {Math.round(prediction.score * 100)}%
          </li>
        ))}
      </ul>
    </>
  );
};

const Test: NextPage = () => {
  return (
    <div>
      <WebcamCapture />
    </div>
  );
};

export default Test;

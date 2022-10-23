// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const atobPolyfill = (a: any) => Buffer.from(a, "base64").toString("binary");

import vision from "@google-cloud/vision";

const client: any = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

const dataURLtoBlob = (dataurl: string) => {
  let arr = dataurl.split(","),
    mime = (arr as any)[0].match(/:(.*?);/)[1],
    bstr = atobPolyfill(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const image = JSON.parse(req.body).image as string;

  console.log(dataURLtoBlob(image));
  // console.log("Image", Buffer.from(image).toString("base64"));
  const request = {
    image: {
      content: Buffer.from(await dataURLtoBlob(image).arrayBuffer()).toString(
        "base64"
      ),
    },
  };

  const [result] = await client.objectLocalization(request);
  console.log(result);
  const objects = result.localizedObjectAnnotations;
  if (objects) {
    objects.forEach((object: { name: string; score: number }) => {
      console.log(`Name: ${object.name}`);
      console.log(`Confidence: ${object.score}`);
    });

    res.json(objects);
  } else {
    res.json(result);
  }
}

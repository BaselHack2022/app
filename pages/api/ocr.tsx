// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const atobPolyfill = (a: any) => Buffer.from(a, "base64").toString("binary");

import vision from "@google-cloud/vision";
import { GoogleAuth } from "google-auth-library";

const client: any = new vision.ImageAnnotatorClient({
  auth: new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
  }),
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

  const [result] = await client.textDetection(request);
  console.log(result);
  const objects = result.fullTextAnnotation;
  if (objects) {
    res.json(objects);
  } else {
    res.json(result);
  }
}

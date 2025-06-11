import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";
const token = process.env["GITHUB_TOKEN"];
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function main() {

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );
  // read image as base64
  const imagePath = resolve(__dirname, "contoso_layout_sketch.jpg");
  const image = fs.readFileSync(imagePath)
  const base64Image = image.toString("base64");
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user",
          content: [
            {
              type: "text",
              text: "Generate a web page layout based on the provided sketch."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]}
      ],
      temperature: 0.2,
      top_p: 1.0,
      max_tokens: 2048,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});


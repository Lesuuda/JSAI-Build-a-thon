import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
  const client = new ModelClient(
  process.env.AZURE_INFERENCE_SDK_ENDPOINT ?? "https://lesuu-mbt5lds8-eastus2.services.ai.azure.com/models", new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY ?? "9ob6fMh50GzMqJ7BbiIepxzI7WdJeinNOSLPW0w8c9qkidWcJAXvJQQJ99BFACrIdLPXJ3w3AAAAACOGYPPj"));

var messages = [
  { role: "developer", content: "You are an helpful assistant" },
  { role: "user", content: "What are 3 things to see in Seattle?" },
];

var response = await client.path("chat/completions").post({
  body: {
    messages: messages,
    max_tokens: 4600,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: "gpt-4.1",
  },
});

console.log(JSON.stringify(response));

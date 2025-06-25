import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
  const client = new ModelClient(
  process.env.AZURE_INFERENCE_SDK_ENDPOINT ?? "https://lesuu-mbt5lds8-eastus2.services.ai.azure.com/models", new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY ?? "Dkv6QCRCPOjHYXGeWgLIRZGRh5D9r7CRyQeOrfvTFS5ZvDi5vuxgJQQJ99BFACHYHv6XJ3w3AAAAACOGQ8BU"));

var messages = [
  { role: "developer", content: "You are an helpful assistant" },
  { role: "user", content: "What are 3 things to see in Seattle?" },
];

var response = await client.path("chat/completions").post({
  body: {
    messages: messages,
    max_completion_tokens: 800,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: "gpt-4.1",
  },
});

console.log(JSON.stringify(response));

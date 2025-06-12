import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();
const client = ModelClient(
    process.env.AZURE_INFERENCE_SDK_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY)
);
console.log(process.env.AZURE_INFERENCE_SDK_ENDPOINT);
var messages = [
    {role: "system", content: "You are a helpful assistant."},
    {role: "user", content: "What is self awareness?"}

];

var response = await client.path("/chat/completions").post({
    body: {
        messages:messages,
        max_tokens: 4096,
        temperature: 1,
        top_p: 1.0,
        model: "gpt-4.1",
    
    },
});
console.log(response.body.choices[0].message.content);
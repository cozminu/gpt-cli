import fs from "fs";
import { toStreamCallback } from "../utils/to-stream-callback";
import { PassThrough } from "stream";
import { OpenAIChat } from "langchain/llms/openai";

export async function singlePromptAction(prompt: string, options: any) {
  const stream = new PassThrough();

  const model = new OpenAIChat({
    prefixMessages: [
      {
        role: "system",
        content: "You are a helpful assistant that answers in pirate language",
      },
    ],
    callbacks: [toStreamCallback(stream)],
    streaming: true,
  });

  if (options.save) {
    const filename =
      typeof options.save === "string"
        ? options.save
        : `./gpt-convo-${new Date().valueOf()}.txt`;
    var myFile = fs.createWriteStream(filename);
    stream.pipe(myFile);
  }

  process.stdout.write("GPT: ");
  stream.pipe(process.stdout);

  await model.call(prompt);
}

import fs from "fs";
import readline from "readline";
import { PassThrough } from "stream";
import { toStreamCallback } from "../utils/to-stream-callback";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { BufferWindowMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";

export async function interactiveChatAction(options: any) {
  const stream = new PassThrough();

  const memory = new BufferWindowMemory({
    memoryKey: "history",
    k: 5,
    returnMessages: true,
  });

  const chat = readline.createInterface({
    input: process.stdin,
    output: stream,
  });

  stream.pipe(process.stdout);

  if (options.save) {
    const filename =
      typeof options.save === "string"
        ? options.save
        : `./gpt-convo-${new Date().valueOf()}.txt`;
    var myFile = fs.createWriteStream(filename);
    stream.pipe(myFile);
    process.stdin.pipe(myFile);
  }

  chat.on("SIGINT", async () => {
    chat.close();
  });

  (async () => {
    while (true) {
      await ask();
    }
  })();

  async function ask(): Promise<any> {
    return new Promise((resolve, reject) => {
      chat.question(`You: `, async (input: string) => {
        try {
          const llm = new ChatOpenAI({
            callbacks: [toStreamCallback(stream)],
            streaming: true,
            modelName: process.env.OPENAI_MODEL,
            temperature: process.env.OPENAI_TEMP
              ? parseFloat(process.env.OPENAI_TEMP)
              : undefined,
          });

          const prompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
              `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.`
            ),
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{input}"),
          ]);

          const chain = new ConversationChain({
            memory,
            prompt,
            llm,
          });

          const response = await chain.call({ input });

          stream.write("\n");
          resolve(response);
        } catch (err: any) {
          console.log(err);
          reject(err.toString());
        }
      });
    });
  }
}

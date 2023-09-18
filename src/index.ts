#!/usr/bin/env node

import { Command } from "commander";
import { interactiveChatAction } from "./commands/interactive-chat.action";
import * as info from "../package.json";
import { config as dotenvConfig } from "dotenv";
import { appName, dotenvFilePath } from "./constants";
import { configAction } from "./commands/config.action";
import { helpAction } from "./commands/help.action";
import { singlePromptAction } from "./commands/single-prompt.action";

dotenvConfig({ path: dotenvFilePath });

async function main() {
  const name = appName;
  const program = new Command(name);

  program
    .version(info.version)
    .description(info.description)
    .option("-s, --save [file]", "save conversation to a file");

  program
    .command("chat")
    .description("Interactive mode with ChatGPT")
    .action(() => {
      interactiveChatAction(program.opts());
    });

  program
    .command("ask <prompt>")
    .description("Ask a single question to ChatGPT")
    .action((prompt) => {
      singlePromptAction(prompt, program.opts());
    });

  program
    .command("help", { isDefault: true })
    .description("Display help for command")
    .action(() => {
      helpAction(program, info);
    });

  program
    .command("config <set/unset> <key> [value]")
    .description("Set/Unset config values")
    .action(configAction);

  program.addHelpText(
    "after",
    `

Example call:
  $ ${name} ask hello`
  );

  await program.parseAsync(process.argv);
}

main();

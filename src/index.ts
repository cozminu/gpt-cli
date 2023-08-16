#!/usr/bin/env node

import figlet from "figlet";
import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";
import boxen from "boxen";
import { startInteractiveChat } from "./modes/interactive";
import { startSinglePromptChat } from "./modes/single-prompt";

async function main() {
  const name = "gpt-cli";
  const version = "v1.0.0";
  const program = new Command(name);

  program
    .version(version)
    .description("Interact with ChatGPT from the CLI")
    .option("-s, --save [file]", "save conversation to a file");

  program
    .command("ask <prompt>")
    .description("Ask a single question to ChatGPT")
    .action((prompt) => {
      startSinglePromptChat(prompt, program.opts());
    });

  program
    .command("chat")
    .description("Interactive mode with ChatGPT")
    .action(() => {
      startInteractiveChat(program.opts());
    });

  program
    .command("help", { isDefault: true })
    .description("Display help for command")
    .action(() => {
      process.stdout.write(
        boxen(chalk.blue(figlet.textSync(name.toUpperCase())), {
          borderColor: "cyan",
          padding: { right: 6, top: 1, bottom: 1, left: 5 },
          title: version,
          titleAlignment: "right",
        }) + "\n"
      );
      program.outputHelp();
    });

  program.addHelpText(
    "after",
    `

Example call:
  $ ${name} ask hello`
  );

  await program.parseAsync(process.argv);
}

main();

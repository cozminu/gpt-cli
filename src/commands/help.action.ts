import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import { appName } from "../constants";

export function helpAction(program: Command, info: any) {
  process.stdout.write(
    boxen(chalk.blue(figlet.textSync(appName.toUpperCase())), {
      borderColor: "cyan",
      padding: { right: 6, top: 1, bottom: 1, left: 5 },
      title: info.version,
      titleAlignment: "right",
    }) + "\n"
  );
  program.outputHelp();
}

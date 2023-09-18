import path from "path";

export const dotenvFilePath = path.join(process.env.HOME || "~", "cli-gpt.env");
export const appName = "gpt";

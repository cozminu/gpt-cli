import { writeFileSync } from "fs";
import { dotenvFilePath } from "../constants";

export function configAction(action: string, key: string, value: string) {
  const keys = ["OPENAI_API_KEY", "OPENAI_MODEL", "OPENAI_TEMP"];
  const models = ["gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-4", "gpt-4-32k"];

  if (!keys.includes(key)) {
    console.log(`Unsupported key. Allowed keys: ${keys.join(", ")}`);
    return;
  }

  if (action == "set") {
    switch (key) {
      case "OPENAI_MODEL":
        if (!models.includes(value)) {
          console.log(
            `Unsupported value. Allowed values: ${models.join(", ")}`
          );
        }
        break;
    }
  }

  let config = keys
    .filter((k) => k in process.env)
    .reduce(
      (map, k: any) => map.set(k, process.env[k] || ""),
      new Map<string, string>()
    );

  switch (action) {
    case "set":
      config.set(key, value);
      break;
    case "unset":
      config.delete(key);
      break;
    case "reset":
      config.clear();
      break;
  }

  const confData = Array.from(config.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("\r\n");

  writeFileSync(dotenvFilePath, confData);
}

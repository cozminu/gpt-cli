import { BaseCallbackHandler } from "langchain/callbacks";
import { Writable } from "stream";

export function toStreamCallback(stream: Writable) {
  class StreamHandler extends BaseCallbackHandler {
    name = "stream_handler";

    handleLLMNewToken(token: string) {
      stream.write(token);
    }

    handleLLMEnd() {
      stream.write("\n");
    }
  }

  return new StreamHandler();
}

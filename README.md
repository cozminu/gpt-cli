# GPT-CLI

Interact with ChatGPT directly from the command line


## Installation

```sh
npm i -g @cozminu/gpt-cli
export OPENAI_API_KEY=<your_openai_api_key>
```

## Usage

1. Open your terminal or command prompt.

2. Set the `OPENAI_API_KEY` environment variable using the command line:

    ```bash
    export OPENAI_API_KEY=<your_openai_api_key>
    ```

    Replace `<your_openai_api_key>` with your actual OpenAI API key. You can generate a new one here: https://platform.openai.com/account/api-keys

3. Run the application using the following command:

    ```sh
    gpt ask "who wrote The Witcher?"
    ```

    or

    ```sh
    gpt chat
    ```

## Features

- ### Single prompt mode

    ```sh
    gpt ask "what is the highest mountain?"
    ```

- ### Interactive mode

    REPL style prompt, ask follow-up questions, gpt uses short-term memory

    ```sh
    gpt chat
    ```

- ### Save flag

    Saves conversation to file

    ```sh
    gpt <ask/chat> -s [filename]
    ```

## Roadmap

⬜ Easier OpenAI API Key (gpt set-key)

⬜ GPT-4 support

⬜ Configuration file (temperature, top_p, model, etc)

⬜ Ask questions from document (pdf, txt)

⬜ Generate document summary

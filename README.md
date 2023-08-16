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

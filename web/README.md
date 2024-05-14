# web
スマートコントラクトに溜まった報酬を引き出すDApps

## Project Setup

1. Package Install.

    ```sh
    npm ci
    ```

1. Set .env
    ```env
    VITE_WALLET_CONNECT_PROJECT_ID={abcd...} # Wallect ConnectのプロジェクトID
    VITE_CONTRACT_ADDRESS={0x...} # コントラクトアドレス 
    VITE_DEFAULT_TO_ADDRESS={0x...} # デフォルトの送金先アドレス
    ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Project Build
```sh
docker built . -t withdraw-dapps
```

### Docker run
```sh
docker run -p 80:80 withdraw-dapps
```
# Ethereum 報酬受取コントラクト

## ここから読めばOK

パッケージのインストール

```sh
npm ci
```

スマートコントラクトのコンパイル

```sh
npx hardhat compile
```

## ローカルにEVMの構築【動作確認用】
```sh
npx hardhat node
```
ここでとれた秘密鍵はメタマスクにインポートすることができる

## スマートコントラクトのデプロイ(Fireblocks利用)

### Keyファイルの配置
keys ディレクトリに`fireblocks_secret.key`と`fireblocks.csr`を配置

### 以下の.envファイルをトップディレクトリに用意
```env
API_SECRET_FILE=./keys/fireblocks_secret.key
API_KEY={あなたのAPI Key}
FIREBLOCKS_URL=https://api.fireblocks.io
FIREBLOCKS_VAULT_ACCOUNT_IDS={あなたのVaultID}
```

ローカルでテストする時はこれ（別ターミナルを開いて実行）

```sh
npx hardhat clean
npx hardhat ignition deploy ./ignition/modules/Token.ts --network localhost
```

Holeskyにデプロイするときはこれを使う
```sh
npx hardhat ignition deploy ./ignition/modules/deploy.ts --network holesky
```

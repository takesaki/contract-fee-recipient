import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "@fireblocks/hardhat-fireblocks";
import { ApiBaseUrl } from "@fireblocks/fireblocks-web3-provider";

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

const getEnv = (name: string): string => {
  // 環境変数が未定義の場合はエラーを投げる
  if (process.env[name] === undefined) {
      throw new Error(`Environment variable ${name} is not defined.`);
  }
  return String(process.env[name]);
}

const apiSecret = fs.readFileSync(path.resolve(getEnv("API_SECRET_FILE")), "utf8");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    holesky: {
      url: "https://rpc.ankr.com/eth_holesky",
      fireblocks: {
        apiBaseUrl: getEnv("FIREBLOCKS_URL"),
        privateKey: apiSecret,
        apiKey: getEnv("API_KEY"),
        vaultAccountIds: getEnv("FIREBLOCKS_VAULT_ACCOUNT_IDS"),
      }
    }
  },
};

export default config;

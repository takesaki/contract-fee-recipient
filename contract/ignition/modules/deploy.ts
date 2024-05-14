import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import 'dotenv/config';

const ContractModule = buildModule("FeeReceiver", (m) => {
  // Deploy a token contract, set the initial supply, the name and the symbol.
  const contract = m.contract("FeeReceiver", []);

  return { contract };
});

module.exports = ContractModule;

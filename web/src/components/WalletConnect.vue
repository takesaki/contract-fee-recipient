<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import { ethers, BrowserProvider, Contract, formatUnits } from 'ethers'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/vue'

import ContractInfo from '../config/FeeReceiver.json'
import contractwc from './web3/contract'

const { address, chainId, isConnected } = useWeb3ModalAccount()
const { walletProvider, walletProviderType } = useWeb3ModalProvider()

let symbol = ref('ETH');

let message = ref('Connect with WalletConnect.');
let transferAmount = ref(0);
let contractAmount = ref(0);
let toAddress = ref(import.meta.env.VITE_DEFAULT_TO_ADDRESS);
let dialog = ref(false);
let canTransfer = ref(false);
let ownerAddress = ref('');

onMounted(() => {
  init();
});

const init = async () => {
  console.log('init');
  ownerAddress.value = await contractwc.getOwner();
  contractAmount.value = await contractwc.getBalanceString();
  transferAmount.value = contractAmount.value;
  console.log('contractAmount', await contractwc.getBalanceString());
}

watchEffect(async () => {
  canTransfer.value = false;
  if(isConnected.value) {
    if(address.value == ownerAddress.value){
      canTransfer.value = true;
    }
  }
});


const showDialog = () => {
  dialog.value = true;
}

const transfer = async() => {

  const contract = await getContract();  
  contract.sendEth(toAddress.value, ethers.parseEther(transferAmount.value.toString())).then((result) => {
    console.dir(result);
  })
  
  dialog.value = false;
}

const getContract = async() => {
  
  //console.log('walletProvider.value', walletProvider.value);
  const provider = new BrowserProvider(walletProvider.value!);
  const signer = await provider.getSigner();
  const contract = new Contract(contractwc.CONTRACT_ADDRESS, ContractInfo.abi, signer);
  return contract;
}

</script>

<template>
  <v-container class="bg-gray-darken-4">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <p v-show="!isConnected" color="primary">{{ message }}</p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <w3m-button />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-slider
          v-model="transferAmount"
          :disabled="!isConnected"
          :min="0"
          :max="contractAmount"
          :step="0.01"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="2">
        <span class="text-h4">{{ transferAmount }}</span> ETH
      </v-col>
      <v-col cols="1">
        <v-icon>mdi-arrow-right-bold-outline</v-icon>
      </v-col>
      <v-col cols="9">
        <v-text-field
        v-model="toAddress"
        variant="underlined"
        label="To Address"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn variant="outlined" :disabled="!canTransfer" @click="showDialog" append-icon="mdi-logout">Transfer</v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-hand-coin-outline"
      :text="'You are about to transfer ' + transferAmount + ' ETH to ' + toAddress + '.'"
      title="Confirm Transfer."
    >
      <template v-slot:actions>
        <v-btn
          text="Cancel"
          @click="dialog = false"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Transfer" @click="transfer"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  h1 {
    place-items: center;
    margin: 0 2rem 0 0;
    font-size: 2rem;
  }
}
</style>
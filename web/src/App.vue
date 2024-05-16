<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

/// wallet connect /////
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue'

import titleImage from './assets/title.jpeg';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

// 2. Set chains
const testnet = {
  chainId: 17000,
  name: 'Ethereum Holesky Testnet',
  currency: 'ETH',
  explorerUrl: 'https://holesky.etherscan.io/',
  rpcUrl: 'https://rpc.ankr.com/eth_holesky'
}
const metadata = {
  name: 'Withdraw dApp',
  description: 'Allow you to wtihdraw your funds from the contract',
  url: 'http://localhost:5714', // url must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false, // true by default
})

const modal = createWeb3Modal({
  ethersConfig,
  chains: [testnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489',
  ],
  allWallets: 'HIDE'
})
///////////////////////


</script>

<template>

  <header>
    <v-img alt="Vue logo" :src="titleImage" cover width="250" class="bg-surface-variant rounded-circle mx-auto" />
    <div class="wrapper">
      <HelloWorld msg="Send your rewards." />
      <!--
      <router-link to="/">wallet connect</router-link>
      -->
    </div>
    
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

@media (min-width: 1200px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

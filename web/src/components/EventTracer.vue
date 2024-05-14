<script setup lang="ts">

import { ref, onMounted, watch, type Ref } from 'vue'
import token from './web3/contract'
import type { Contract } from 'ethers';

// トークンコントラクト
const contract: Contract = token.getContractObject();
// 親からのプロパティ
const props = defineProps<{ myAddress: string|undefined, toAddress: string }>(); // 宛先アドレス

// ローカル変数
let totalSupply = ref(0);
let myAmount = ref(0);
let toAmount = ref(0);

// watch 設定
watch(props, () => {
  refleshAll();
});

// 起動時イベント
onMounted(() => {
 
  refleshAll();
  setListenEvent();
  
})

const refleshAll = async () => {
  totalSupply.value = await token.getTotalSupply();
  if (props.myAddress){
    console.log("refleshAll: address.value", props.myAddress);
    myAmount.value = await token.getBalance(props.myAddress);
  }
  console.log("refleshAll: toAddress", props.toAddress);
  toAmount.value = await token.getBalance(props.toAddress);
}

const setListenEvent = () => {
  contract.on(contract.filters.MintEvent, async (to, amount) => {
    console.log("MintEvent!!", to, amount);
    //refleshAll();
  });
  contract.on(contract.filters.Transfer, async (from, to, amount) => {
    console.log("Transfer!!", from, to, amount);
    refleshAll();
  });
}

</script>


<template>
  <v-table class="mt-2" density="compact" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-center">
          Key
        </th>
        <th class="text-center">
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>供給量</td>
        <td>{{ totalSupply }}</td>
      </tr>
      <tr v-show="props.myAddress" >
        <td>アドレス</td>
        <td>{{ props.myAddress }}</td>
      </tr>
      <tr v-show="props.myAddress" >
        <td>保有量</td>
        <td>{{ myAmount }}</td>
      </tr>
      <tr>
        <td>宛先アドレス</td>
        <td>{{ toAddress }}</td>
      </tr>
      <tr>
        <td>宛先保有量</td>
        <td>{{ toAmount }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
</style>
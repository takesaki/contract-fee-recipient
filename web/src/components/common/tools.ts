const sleep = async (interval: number) => {
  return new Promise(resolve => setTimeout(resolve, interval*1000));
}

// Classをエクスポートします。
export default {
  sleep
};
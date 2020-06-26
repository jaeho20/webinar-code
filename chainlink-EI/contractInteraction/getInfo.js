/* eslint-disable */

const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
  const cfx = new Conflux({
    url: 'http://testnet-jsonrpc.conflux-chain.org:12537',
    defaultGasPrice: 100,
    defaultGas: 1000000,
    logger: console,
  });

  console.log(cfx.defaultGasPrice); // 100
  console.log(cfx.defaultGas); // 1000000

  // ================================ Account =================================
  const account = cfx.Account(PRIVATE_KEY); // create account instance
  console.log(account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require("./contract/abi.json"), //can be copied from remix
    address: "0x8aa73841e0a0e6e816b2c66c9c5ed1e144ad8cbb",
  });

  // get current number
  const output = await contract.getNum();
  console.log(Number(output));
}

main().catch((e) => console.error(e));

/* eslint-disable */

const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
  const cfx = new Conflux({
    url: "http://testnet-jsonrpc.conflux-chain.org:12537",
    defaultGasPrice: 100,
    defaultGas: 1000000,
    logger: console,
  });

  console.log(cfx.defaultGasPrice); // 100
  console.log(cfx.defaultGas); // 1000000

  // ================================ Account =================================
  const account = cfx.Account({ privateKey: PRIVATE_KEY }); // create account instance
  console.log(account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require("./contract/abi.json"), //can be copied from remix
    address: "0x82b9e4114b1701149710998b7c1cf615fa1d2707",
  });

  // // interact with contract
  // const tx = contract.setValue(20);
  // const receipt = await account.sendTransaction(tx).executed();
  // console.log(receipt);

  // check value from contract
  const value = await contract.value();
  console.log(Number(value));

}

main().catch((e) => console.error(e));

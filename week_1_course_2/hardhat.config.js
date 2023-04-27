require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');
// require("./task/balance.js");

let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const mnemonic = process.env.MNEMONIC
const scankey = process.env.ETHERSCAN_API_KEY
const PRIVATE_KEY1 = process.env.PRIVATEKEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    networks: {
        hardhat: {},

        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com",
            chainId: 80001,
            accounts: {
                mnemonic: mnemonic,
            },
        }
    },
    etherscan: {
        apiKey: {
            polygonMumbai: scankey,
        }
    },
};

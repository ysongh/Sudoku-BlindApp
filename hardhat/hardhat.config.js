require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    "sepolia": {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATEKEY],
    },
  },
  paths: {
    artifacts: '../nextjs/src/artifacts',
    cache: '../nextjs/src/cache',
  }
};

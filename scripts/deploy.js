const { ethers } = require("hardhat");
const { string } = require("hardhat/internal/core/params/argumentTypes");
const web3 = require("web3");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(deployer)
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Dai = await ethers.getContractFactory("Dai");
    const dai = await Dai.deploy("Dai", "DAI", 10000000000);
    console.log("Token address:", dai.address);

    const Link = await ethers.getContractFactory("Link");
    const link = await Link.deploy("Chainlink", "LINK", 1000000);
    console.log("Token address:", link.address);

    const Comp = await ethers.getContractFactory("Comp");
    const comp = await Comp.deploy("Comp", "COMP", 10000);
    console.log("Token address:", comp.address);

    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.deploy([dai.address, link.address, comp.address]);
    console.log("Token address:", dex.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

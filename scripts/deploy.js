const { ethers } = require("hardhat");
const { string } = require("hardhat/internal/core/params/argumentTypes");
const web3 = require("@nomiclabs/hardhat-web3");

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
    // ether
    const dex = await Dex.deploy([dai.address, link.address, comp.address], ['0x773616e4d11a78f511299002da57a0a94577f1f4', '0xdc530d9457755926550b59e8eccdae7624181557', '0x1b39ee86ec5979ba5c322b826b3ecb8c79991699']);
    console.log("Token address:", dex.address);
    await dai.transfer(dex.address, 10000000000);
    await link.transfer(dex.address, 1000000);
    await comp.transfer(dex.address, 10000);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

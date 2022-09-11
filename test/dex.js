const {expect} = require("chai");
const { MockProvider } = require("ethereum-waffle");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const web3 = require("web3");

describe("Dex", function () {
    let nft, hardhatToken, owner, addr1, addr2, addrs, mockedDai, mockedErc20
    beforeEach(async function(){
        ;[owner, addr1, addr2, addr3] = provider.getWallets();
        const Comp = require('../artifacts/contracts/myToken.sol/Comp.json');
        const mockedComp = await deployMockContract(owner, Comp.abi);
        const Dai = require('../artifacts/contracts/myToken.sol/Dai.json');
        mockedDai = await deployMockContract(owner, Dai.abi);
        const Link = require('../artifacts/contracts/myToken.sol/Link.json');
        const mockedLink = await deployMockContract(owner, Link.abi);
        nft = await ethers.getContractFactory("Dex");
        hardhatToken = await nft.deploy([mockedDai.address, mockedLink.address, mockedComp.address], ['0x773616e4d11a78f511299002da57a0a94577f1f4', '0xdc530d9457755926550b59e8eccdae7624181557', '0x1b39ee86ec5979ba5c322b826b3ecb8c79991699']);
    })

    describe('Deployment', function () {
    })


    describe('buyToken', function () {
        it("Not supported token", async function () {});
        it("Insufficient fund", async function () {});
        it("Token sold out", async function () {});
        it("", async function () {});
    })    
})
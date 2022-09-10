const {expect} = require("chai");
const { MockProvider } = require("ethereum-waffle");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const web3 = require("web3");
// import IERC20 from "../build/IERC20.json"

describe("Dex", function () {
    let nft, hardhatToken, owner, addr1, addr2, addrs, mockedDai, mockedErc20
    beforeEach(async function(){
        // ;[owner, addr1, addr2, addr3] = new MockProvider().getWallets();
        ;[owner, addr1, addr2, addr3] = provider.getWallets();
        // const erc20 = require('../artifacts/contracts/mocks/erc20.sol/erc20.json');
        mockedErc20 = await deployMockContract(owner, erc20.abi);
        const Comp = require('../artifacts/contracts/MyToken.sol/Comp.json');
        const mockedComp = await deployMockContract(owner, Comp.abi);
        const Dai = require('../artifacts/contracts/MyToken.sol/Dai.json');
        mockedDai = await deployMockContract(owner, Dai.abi);
        const Link = require('../artifacts/contracts/MyToken.sol/Link.json');
        const mockedLink = await deployMockContract(owner, Link.abi);
        nft = await ethers.getContractFactory("Dex");
        hardhatToken = await nft.deploy([mockedDai.address, mockedLink.address, mockedComp.address], ['0x773616e4d11a78f511299002da57a0a94577f1f4', '0xdc530d9457755926550b59e8eccdae7624181557', '0x1b39ee86ec5979ba5c322b826b3ecb8c79991699']);
    })

    // describe('Deployment', function () {
    //     it('Should set the right owner', async function () {
    //         expect(await hardhatToken.owner()).to.equal(owner.address)
    //     })
    // })

    describe('Constructor', function () {
    })

    describe('buyToken', function () {
        it("Not supported token", async function () {
            // const invalidAddr = web3.utils.toChecksumAddress('0xb413E6E4b8f2a923D98304ec87F64353C4D5C853')
            // await expect(hardhatToken.connect(invalidAddr).buyToken(mockedDai.address, ethers.utils.parseEther('0.001'), {value: ethers.utils.parseEther('0.001')})).to.be.revertedWith("This token is not supported");
        });
        it("Insufficient fund", async function () {
            // TODO chainlink

            // await mockedDai.mock.balanceOf.withArgs(hardhatToken.address).returns(1000000000000000);
            // await mockedDai.mock.transfer.withArgs(addr1.address, 1000000000).returns(true);

            await expect(hardhatToken.connect(addr1).buyToken(mockedDai.address, ethers.utils.parseEther('0.01'), {value: ethers.utils.parseEther('0.001')})).to.be.revertedWith("Insufficient fund");
        });
        it("Token sold out", async function () {
            // TODO chainlink

            // await mockedDai.mock.balanceOf.withArgs(hardhatToken.address).returns(10000);
            // await mockedDai.mock.transfer.withArgs(addr1.address, 1000000000).returns(true);
            
            // console.log(await hardhatToken.connect(addr1).supportedTokenAddr(mockedDai.address));

            // await expect (hardhatToken.connect(addr1).buyToken(mockedDai.address, ethers.utils.parseEther('0.01'), {value: ethers.utils.parseEther('0.01')})).to.be.revertedWith("Token sold out");
        });
        it("", async function () {
            // TODO chainlink
            // await mockedDai.mock.balanceOf.withArgs(hardhatToken.address).returns(1000000000000000);
            // await mockedDai.mock.transfer.withArgs(addr1.address, 1000000000).returns(true);
            // cost = ethers.utils.parseEther('0.01')
            // TODO
            // await expect (hardhatToken.connect(addr1).buyToken(mockedDai.address, cost, {value: cost}))
            //     .to.emit(hardhatToken, "buy")
            //     .withArgs(addr1.address, mockedDai.address, cost, (cost / 1000000) - (cost % 1000000));
        });
    })    
})
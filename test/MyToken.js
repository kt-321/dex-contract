const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("初めてのテスト", function () {
    it("必ず失敗するテスト", async function () {
        expect(false).to.equal(true);
    });
});

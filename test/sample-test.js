const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Trustmed", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Trustmed = await ethers.getContractFactory("Trustmed");
    const trustmed = await Trustmed.deploy("Hello, world!");
    await trustmed.deployed();

    expect(await trustmed.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

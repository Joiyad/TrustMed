const { ethers } = require("hardhat");

describe("Trustmed", function () {
  it("Should return the product details", async function () {
    const Trustmed = await ethers.getContractFactory("Trustmed");
    const trustmed = await Trustmed.deploy();
    await trustmed.deployed();

    const res = await trustmed.registerProduct(4, 1, 'puma', 'sf', 'shoes', 'puma', 'mumbai', '11Jan2022')
    if(res) console.log("product registered successfully");

    const res2 = await trustmed.getDetailsNotOwner(4);
    console.log(res2);

    const res3 = await trustmed.getDetailsOwner(4);
    console.log(res3);
  });
});

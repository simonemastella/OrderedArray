import { ethers } from "hardhat";

async function main() {
  const OA = await ethers.getContractFactory("OrderedArray");
  const ordArray = await OA.deploy();

  await ordArray.deployed();

  const Mock = await ethers.getContractFactory("MockAddressArray", {
    libraries: { OrderedArray: ordArray.address }
  });
  const mock = await Mock.deploy();

  await mock.deployed();

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

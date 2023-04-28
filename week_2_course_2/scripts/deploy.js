// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
let accounts;

async function main() {
  accounts = await ethers.getSigners();
  const [owner, student1] = accounts;
  const Score = await hre.ethers.getContractFactory("Score");
  const score = await Score.deploy(owner.address);

  await score.deployed();

  const Teacher = await hre.ethers.getContractFactory("Teacher");
  const teacher = await Teacher.deploy(score.address);

  await teacher.deployed();

  console.log(`Score deployed to ${score.address}`);
  console.log(`Teacher deployed to ${teacher.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

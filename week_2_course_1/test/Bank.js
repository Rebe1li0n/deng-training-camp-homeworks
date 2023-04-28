const { expect } = require("chai");
const exp = require("constants");
let bank;
let accounts;


describe("Bank", function () {
    async function init() {
        // const [owner, other] = await ethers.getSigners();
        const Bank = await ethers.getContractFactory("Bank");
        bank = await Bank.deploy();
        await bank.deployed();
        console.log("contract address of counter:" + bank.address);
    }

    before(async function () {
        await init();
        accounts = await ethers.getSigners();
        // const [owner, other1, other2] = await ethers.getSigners();
    });
    it("Balance should init to zero while contract be deployed", async function () {
        // expect(await counter.counter.to.equal(0));
        const [owner, other1, other2] = accounts;
        bank.connect(owner);
        expect(await bank.checkMyDepositBalance()).to.equal(0);
        bank.connect(other1);
        expect(await bank.checkMyDepositBalance()).to.equal(0);
        bank.connect(other2);
        expect(await bank.checkMyDepositBalance()).to.equal(0);
        // expect(await counter.counter()).to.equal(0);
    });

    // it("After increment, counter should plus one compared to the original", async function () {
    //     await owner.sendTransaction({
    //         to: address(this),
    //         value: ethers.utils.parseEther('1.0')
    //     });
    //     let originalcounter = await counter.counter();
    //     let afterIncrement = await counter.increment();
    //     await afterIncrement.wait();
    //     expect(await counter.counter()).to.equal(Number(originalcounter) + 1);
    // })

    // it("Only onwer can withdrawAll", async function () {

    //     await counter.connect(owner);
    //     let cur = await counter.counter();
    //     await counter.increment();
    //     console.log(cur + '\n');
    //     console.log(Number(counter.counter()));
    //     expect(await counter.counter()).to.equal(Number(cur) + 1);
    //     // expect(await counter.counter()).to.equal(Number(cur) + 1);

    //     counter.connect(other);
    //     expect(await counter.increment()).to.be.revertedWith("Only owner can call increment()");
    // });
});
const { expect } = require("chai");
let counter;

describe("Counter", function () {
    async function init() {
        // const [owner, other] = await ethers.getSigners();
        const Counter = await ethers.getContractFactory("Counter");
        counter = await Counter.deploy();
        await counter.deployed();
        console.log("contract address of counter:" + counter.address);
    }

    before(async function () {
        await init();
    });

    it("Should init to zero while contract be deployed", async function () {
        // expect(await counter.counter.to.equal(0));
        expect(await counter.counter()).to.equal(0);
    });

    it("After increment, counter should plus one compared to the original", async function () {
        let originalcounter = await counter.counter();
        let afterIncrement = await counter.increment();
        await afterIncrement.wait();
        expect(await counter.counter()).to.equal(Number(originalcounter) + 1);
    })

    it("Only onwer can call increment", async function () {
        const [owner, other] = await ethers.getSigners();
        await counter.connect(owner);
        let cur = await counter.counter();
        await counter.increment();
        console.log(cur + '\n');
        console.log(Number(counter.counter()));
        expect(await counter.counter()).to.equal(Number(cur) + 1);
        // expect(await counter.counter()).to.equal(Number(cur) + 1);

        counter.connect(other);
        expect(await counter.increment()).to.be.revertedWith("Only owner can call increment()");
    });
});
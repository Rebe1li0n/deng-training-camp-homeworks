const { expect } = require("chai");
let counter;

describe("Counter", function () {
    async function init() {
        const [owner, caller] = await ethers.getSigners();
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
        expect(await counter.counter()).to.equal(originalcounter + 1);
    })

});

import { expect, use } from 'chai';
import { ethers } from 'hardhat';
import { AddressOrderedArray, MockAddress } from '../typechain-types/index';

describe('Stake Simulation', () => {
    let ordArray: AddressOrderedArray;
    let mock: MockAddress;
    before(async () => {
        const OA = await ethers.getContractFactory("AddressOrderedArray");
        ordArray = await OA.deploy();

        await ordArray.deployed();

        const Mock = await ethers.getContractFactory("MockAddress", {
            libraries: { AddressOrderedArray: ordArray.address }
        });
        mock = await Mock.deploy();

        await mock.deployed();
    });

    it("add", async () => {
        const insert = [5, 23, 1, 4, 67, 23, 75, 86, 83, 21, 53, 543];
        insert.forEach(async num => {
            await mock.add(num);
        })

        const array = await mock.getArray();
        expect(array.length).to.equal(insert.length);//insertEveryElement
        const order: number[] = [];
        for (let i = 1; i < array.length; i++) {
            order.push(array[i - 1].localeCompare(array[i]))
        }
        expect(order.every((n) => n <= 0)).to.equal(true);//isOrdered
    });

    it("get",async () => {
        expect(await mock.exist(1)).to.equal(true);
        expect(await mock.exist(2)).to.equal(false);
    })
});
var NGO = artifacts.require("./NGO.sol");
const assertRevert = require('./helpers/assertRevert')


contract('NGO', function (accounts) {
    let ngo = null;
    beforeEach(async () => {
        ngo = await NGO.new(100000);
    })

    describe('Testing Merchants', () => {
        it('should add a valid merchant', async () => {
            await ngo.addMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "BobSupplier", "Water;Apples;rice");
            const merchant = await ngo.findMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57"); 
            assert.equal(merchant[0], "0x627306090abaB3A6e1400e9345bC60c78a8BEf57".toLowerCase(), "address does not match of added merchant");
            assert.equal(merchant[1], "BobSupplier", "type of goods does not match of added merchant");
            assert.equal(merchant[2], "Water;Apples;rice", "type of goods does not match of added merchant");
            assert.equal(merchant[3], 0, "token balance does not match of added merchant 0");
        })
    });

    describe('Testing Merchants', () => {
        it('should revert if not a valid merchant', async () => {
            await assertRevert(ngo.addMerchant("", "BobSupplier", "Water;Apples;rice"));
            const merchant = await ngo.findMerchant("");
            assert.equal(merchant[0], 0, "should not have an address");
            assert.equal(merchant[1], "", "should not have a name");
            assert.equal(merchant[2], "", "should not have types of goods");
            assert.equal(merchant[3], 0, "should not have token balance");
        })
    });

    describe('Testing Merchants', () => {
        it('should revert if a duplicate merchant', async () => {
            await ngo.addMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "BobSupplier", "Water;Apples;rice");
            await assertRevert(ngo.addMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "BobSupplier", "Water;Apples;rice"));
            const merchant = await ngo.findMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
            assert.equal(merchant[0], "0x627306090abaB3A6e1400e9345bC60c78a8BEf57".toLowerCase(), "address does not match of added merchant");
            assert.equal(merchant[1], "BobSupplier", "type of goods does not match of added merchant");
            assert.equal(merchant[2], "Water;Apples;rice", "type of goods does not match of added merchant");
            assert.equal(merchant[3], 0, "token balance does not match of added merchant 0");
        })
    });
    
});

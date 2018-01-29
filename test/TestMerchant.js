var Merchant = artifacts.require("./NGO.sol");

contract('NGO', function (accounts) {
    it("should add a merchant", function () {
        return Merchant.deployed().then(function (instance) {
            instance.addMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "BobSupplier", "Water;Apples;rice");
            return instance.findMerchant("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
        }).then(function (m) {

            assert.equal(m.merchantAddress, "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "address does not match of added merchant");
            assert.equal(m.typeOfGoods, "Water;Apples;rice", "type of goods does not match of added merchant");
            assert.equal(m.tokenBalance, 0, "token balance does not match of added merchant 0");
        });
    });
    
});

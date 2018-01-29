var NGO = artifacts.require("./NGO.sol");
const assertRevert = require('./helpers/assertRevert')


contract('NGO', function (accounts) {
    

    it("should add a beneficiary", function () {
        return NGO.deployed().then(function (instance) {
            instance.addBeneficiary("0xf17f52151EbEF6C7334FAD080c5704D77216b732", "passport1");

            return instance.findBeneficiary("0xf17f52151EbEF6C7334FAD080c5704D77216b732");
        }).then(function (x) {
            assert.equal(x[0], "0xf17f52151EbEF6C7334FAD080c5704D77216b732".toLowerCase(), "address does not match of added Beneficiary");
            assert.equal(x[1], "passport1", "Passport doesn't match")
            assert.equal(x[2], 0, "Token balance must be zero")
        });
    });

});
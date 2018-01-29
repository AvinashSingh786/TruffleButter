pragma solidity ^0.4.18;

// NGO contract, for managing funds

contract NGO {

    struct Beneficiary {
        address beneficiaryAddress;
        string id; //hashed id/passport
        uint tokenBalance; //current token balance -- TODO consider getting from blockchain account
    }

    struct Merchant {
        address merchantAddress; 
        string name;
        string typeOfGoods; // colon seperated list of goods sold
        uint tokenBalance; // number of tokens the Merchant has to redeem
    }

    mapping (address => Merchant) merchants;
    mapping (address => Beneficiary) beneficiaries;
    uint tokens;

    // constructor to initialize number of tokens
    function NGO(uint numberOfTokens) public {
        tokens = numberOfTokens;
    }

    // finds and returns beneficiaries by address
    function findBeneficiary(address beneficiary) public view returns (address, string, uint) {
        return (beneficiaries[beneficiary].beneficiaryAddress, beneficiaries[beneficiary].id, 
            beneficiaries[beneficiary].tokenBalance);
    }
    
    function addBeneficiary(address beneficiary, string id) public {
        require(beneficiaries[beneficiary].beneficiaryAddress == address(0)); 
        beneficiaries[beneficiary] = Beneficiary(beneficiary, id, 0);
    }
    
    function removeBeneficiary(address beneficiary) public {
        var (b,,) = findBeneficiary(beneficiary);
        require(b != address(0)); 
        delete beneficiaries[beneficiary];
    }

    // finds and returns if a Merchant exists with the provided address
    function findMerchant(address merchant) public view returns (address, string, string, uint) {
        return (merchants[merchant].merchantAddress, merchants[merchant].name, 
            merchants[merchant].typeOfGoods, merchants[merchant].tokenBalance);
    }

    // adds a merchant if it does not exist
    function addMerchant(address merchant, string name, string typeOfGoods) public {
        var (m,,,) = findMerchant(merchant);
        require(m == address(0)); 
        merchants[msg.sender] = Merchant(merchant, name, typeOfGoods, 0);
    }

    //
    function removeMerchant(address merchant) public {
        var (m,,,) = findMerchant(merchant);
        require(m != address(0)); 
        delete merchants[msg.sender];
    }
    
}

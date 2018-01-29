pragma solidity ^0.4.18;

// NGO contract, for managing funds

contract NGO {

    struct Merchant {
        address merchantAddress; 
        string name;
        string typeOfGoods; // colon seperated list of goods sold
        uint tokenBalance; // number of tokens the Merchant has to redeem
    }

    mapping (address => Merchant) merchants;
    uint tokens;

    // constructor to initialize number of tokens
    function NGO(uint numberOfTokens) public {
       tokens = numberOfTokens;
    }
    
    // finds and returns if a Merchant exists with the provided address
    function findMerchant(address merchant) public returns (Merchant) {
        return merchants[merchant];
    }

    // adds a merchant if it does not exist
    function addMerchant(address merchant, string name, string typeOfGoods) public {
        require(findMerchant(merchant).merchantAddress == address(0)); 
        merchants[msg.sender].merchantAddress = merchant;
        merchants[msg.sender].name = name;
        merchants[msg.sender].typeOfGoods = typeOfGoods;
        merchants[msg.sender].tokenBalance = 0;
    }

    
}

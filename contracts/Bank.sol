pragma solidity ^0.4.18;

// Bank contract, for managing merchants and tokens

import "./Math/SafeMath.sol";

contract Bank {
    
    using SafeMath for uint; // prevents underflow/overflow problem

    struct Merchant {
        address merchantAddress; 
        string name;
        string typeOfGoods; // colon seperated list of goods sold
        uint tokenBalance; // number of tokens the Merchant has to redeem
    }

    mapping (address => Merchant) merchants;

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
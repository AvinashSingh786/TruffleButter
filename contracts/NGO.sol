pragma solidity ^0.4.18;

// NGO contract, for managing funds

import "./Math/SafeMath.sol";

contract NGO {

    using SafeMath for uint; // prevents underflow/overflow problem

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

    struct GDO {
        address gdoAddress;
        string name;
        uint donateableFunds;
    }

    mapping (address => Merchant) merchants;
    mapping (address => Beneficiary) beneficiaries;
    mapping (address => GDO) gdos;
    uint ngoFunds;
    uint tokens;

    // constructor to initialize number of tokens
    function NGO(uint numberOfTokens, uint funds) public {
        ngoFunds = funds;
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

    // adds a gdo if it does not exist
    function addGDO(address gdo, string name, uint funds) public {
        require(gdos[gdo].gdoAddress == address(0)); 
        gdos[gdo] = GDO(gdo, name, funds);
    }

    // finds and returns if a gdo exists with the provided address
    function findGDO(address gdo) public view returns (address, string, uint) {
        return (gdos[gdo].gdoAddress, gdos[gdo].name, 
            gdos[gdo].donateableFunds);
    }

    // sends funds from gdo to ngo
    function fundNGO (address gdo, uint ammount) public{
        if(ammount <= gdos[gdo].donateableFunds){
            gdos[gdo].donateableFunds -= ammount;
            ngoFunds += ammount;
        }
    }   
}
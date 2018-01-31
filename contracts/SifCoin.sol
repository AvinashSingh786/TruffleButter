pragma solidity ^0.4.18;

contract SifCoin {
    string public name = "SifCoin";
    string public symbol = "SNT";
    uint256 public totalSupply;
    address public owner;

    // creates an array of balances
    mapping (address => uint256) public balanceOf;

    // fires an event upon burn
    event Burn(address indexed from, uint256 value);

    // constructor function
    function SifCoin(uint256 initialSupply) public {
        totalSupply = initialSupply;                         
        balanceOf[msg.sender] = totalSupply;                                                 
        owner = msg.sender;                                  
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

   // internal _transfer
    function _transfer(address _from, address _to, uint _value) internal {
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    } 
    
    // transfers tokens to _to from the bank's address
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    // transfers tokens to _to from NGO's address -- OR -- from beneficiary to merchant??
    function transferFrom(address _from, address _to, uint256 _value) public {
        _transfer(_from, _to, _value);
    }
    
    // mint tokens in any address
    function mintToken(address target, uint256 mintedAmount) external onlyOwner {
        balanceOf[target] += mintedAmount;
        totalSupply += mintedAmount;
    }
    
    // burns _value amount of SifCoins for supply control
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);      
        balanceOf[msg.sender] -= _value;               
        totalSupply -= _value;                         
        Burn(msg.sender, _value);
        return true;
    }

    // burns _value amount of SifCoins from the merchant for redeem purpose
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        balanceOf[_from] -= _value;                         
        totalSupply -= _value;
        Burn(_from, _value);
        return true;
    }
}

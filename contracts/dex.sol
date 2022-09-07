pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Dex {
    // address private _addrForChainlink;
    event buy(address account, address _tokenAddr, uint256 _cost, uint256 _amount);
    event sell(address account, address _tokenAddr, uint256 _cost, uint256 _amount);
    
    // mapping(address => bool) public supportedTokenAddr;
    
    // supportedTokenAddr
    // key: deployedTokenAddress, value: tokenAddressForChainlink
    // mapping(address => AggregatorV3Interface) public tokenInterfacesForChainlink;
    mapping(address => address) public supportedTokenAddr;

    modifier supportsToken(address _tokenAddr) {
        // require(supportedTokenAddr[_tokenAddr] == true, "This token is not supported");
        require(supportedTokenAddr[_tokenAddr] != address(0x0), "This token is not supported");
        _;
    }

    constructor(address[] memory _tokenAddrs, address[] memory _addrsForChainlink) {
        for(uint256 i = 0; i < _tokenAddrs.length; i++) {
            // supportedTokenAddr[_tokenAddrs[i]] = true;
            supportedTokenAddr[_tokenAddrs[i]] = _addrsForChainlink[i];
            // tokenInterfacesForChainlink[_tokenAddrs[i]] = AggregatorV3Interface(_addrsForChainlink[i]);
        }
    }

    function getLatestPrice(address _tokenAddress) public view returns (int) {
        AggregatorV3Interface feed = AggregatorV3Interface(supportedTokenAddr[_tokenAddress]);
        // AggregatorV3Interface feed = tokenInterfacesForChainlink[_tokenAddress];
        ( , int price, , , ) = feed.latestRoundData();
        return price / 1e8;
    }

    // function buyToken(address _tokenAddr, uint256 _cost, uint256 _amount) external payable supportsToken(_tokenAddr){
    function buyToken(address _tokenAddr, uint256 _cost) external payable supportsToken(_tokenAddr){
        ERC20 token = ERC20(_tokenAddr);
        // eth
        require(msg.value == _cost, "Insufficient fund");
        
        int price = getLatestPrice(_tokenAddr);
        // _cost / price
        uint256 amount = _cost / uint(price) - (_cost % uint(price));

        // erc20 token
        require(token.balanceOf(address(this)) >= amount, "Token sold out");
        token.transfer(msg.sender, amount);
        emit buy(msg.sender, _tokenAddr, _cost, amount);
        // require(token.balanceOf(address(this)) >= _amount, "Token sold out");
        // token.transfer(msg.sender, _amount);
        // emit buy(msg.sender, _tokenAddr, _cost, _amount);
    }
    
    // function sellToken(address _tokenAddr, uint256 _cost, uint256 _amount) external payable {
    function sellToken(address _tokenAddr, uint256 _cost) external payable {
        ERC20 token = ERC20(_tokenAddr);
        // erc20 token
        require(token.balanceOf(msg.sender) >= _cost, "Insufficient token balance");

        int price = getLatestPrice(_tokenAddr);
        // _cost / price
        uint256 amount = _cost / uint(price) - (_cost % uint(price));
        require(address(this).balance >= amount, "Dex does not have enough funds");
        // require(address(this).balance >= _amount, "Dex does not have enough funds");

        token.transferFrom(msg.sender, address(this), _cost);
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        // (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "ETH transfer failed");
        emit sell(msg.sender, _tokenAddr, _cost, amount);
        // emit sell(msg.sender, _tokenAddr, _cost, _amount);
    }
}

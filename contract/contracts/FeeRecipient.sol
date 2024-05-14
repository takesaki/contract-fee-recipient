// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeReceiver is Ownable{
  
  constructor() Ownable(msg.sender) {
  }

  // Ethの残高を確認する関数
  function getBalance() public view returns (uint256) {
      return address(this).balance;
  }

  // ownerが任意のアドレスにEthを送金する関数
  function sendEth(address payable _to, uint256 _amount) public onlyOwner{
      require(msg.sender == owner(), "Only owner can send Eth");
      require(_to != address(0), "Invalid recipient address");
      require(address(this).balance >= _amount, "Insufficient balance");

      //_to.transfer(_amount);
      (bool isSend, bytes memory data) = _to.call{value: _amount}("");
      require(isSend, "Failed to send Ether");
      emit SendEvent(_to, _amount);
  }

  // コントラクトがEthを受け取るための関数
  receive() external payable {}
  // Fallback function is called when msg.data is not empty
  fallback() external payable {}
  
  event SendEvent(address indexed to,uint256 indexed amount);

}
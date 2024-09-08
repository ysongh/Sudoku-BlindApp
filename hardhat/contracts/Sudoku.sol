//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Sudoku {
  constructor() {}

  Game[] games;

  struct Game {
    string programId;
    string storeId;
    uint[] numbers;
  }

  function getGames() public view returns (Game[] memory){
    return games;
  }

  function getNumbers(uint _id) public view returns (uint[] memory){
    return games[_id].numbers;
  }

  function createGame(string memory _programId, string memory _storeId, uint[] memory _numbers) public {
    games.push(Game(_programId, _storeId, _numbers));
  }
}

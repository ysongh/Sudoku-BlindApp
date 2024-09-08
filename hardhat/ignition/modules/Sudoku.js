const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SudokuModule", (m) => {
  const sudoku = m.contract("Sudoku");

  return { sudoku };
});
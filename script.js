const gameBoard = (() => {
  const board = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];

  const markBoard = (player) => {};

  const isTaken = (index) => {
    if (board[index] === "X" || board[index] === "O") {
      return true;
    }
    return false;
  };

  return {
    markBoard,
  };
})();

const displayController = (() => {})();

const PlayerFactory = (name, piece) => {
  const getName = () => name;

  const getPiece = () => piece;

  return {
    getName,
    getPiece,
  };
};

const tyler = PlayerFactory("tyler");
console.log(tyler.getName());

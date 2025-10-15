import Square from "./Square";

function Board({ xIsNext, squares, onPlay, boardSize }) {
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  // The result from calculateWinner is now an object with the winner and the winning line.
  const winnerInfo = calculateWinner(squares, boardSize);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  let status;
  // New logic to handle a winner, a draw, or the next player's turn.
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    // If every square is filled and there's no winner, it's a draw.
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const rowSquares = [];
    for (let col = 0; col < boardSize; col++) {
      const squareIndex = row * boardSize + col;
      rowSquares.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          // Pass a prop to the Square if it's part of the winning line.
          isWinningSquare={winningLine.includes(squareIndex)}
        />
      );
    }
    boardRows.push(<div className="board-row" key={row}>{rowSquares}</div>);
  }

  return (
    <>
      {/* You can add this style tag to your main CSS file or index.html to see the highlight */}
      <style>{`.square.winner { background-color: #90ee90; }`}</style>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

function calculateWinner(squares, boardSize) {
  const getIndex = (row, col) => row * boardSize + col;

  const winLength = boardSize >= 5 ? 5 : boardSize;

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const player = squares[getIndex(row, col)];
      if (!player) continue;

      // Check horizontally (right)
      if (col + winLength <= boardSize) {
        const line = Array.from({ length: winLength }, (_, i) => getIndex(row, col + i));
        if (line.every(index => squares[index] === player)) {
          return { winner: player, line };
        }
      }

      // Check vertically (down)
      if (row + winLength <= boardSize) {
        const line = Array.from({ length: winLength }, (_, i) => getIndex(row + i, col));
        if (line.every(index => squares[index] === player)) {
          return { winner: player, line };
        }
      }

      // Check diagonally (down-right)
      if (row + winLength <= boardSize && col + winLength <= boardSize) {
        const line = Array.from({ length: winLength }, (_, i) => getIndex(row + i, col + i));
        if (line.every(index => squares[index] === player)) {
          return { winner: player, line };
        }
      }

      // Check diagonally (down-left)
      if (row + winLength <= boardSize && col - winLength + 1 >= 0) {
        const line = Array.from({ length: winLength }, (_, i) => getIndex(row + i, col - i));
        if (line.every(index => squares[index] === player)) {
          return { winner: player, line };
        }
      }
    }
  }

  return null;
}

export default Board
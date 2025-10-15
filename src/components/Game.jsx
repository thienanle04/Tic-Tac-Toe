import Board from "./Board";
import { useState } from "react";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {/* If the current list item is the move we are on, show text. Otherwise, show a button. */}
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  // Conditionally sort the moves based on the state
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
          <div className="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} boardSize={3}/>
          </div>
          <div className="game-info">
              <button onClick={handleSortToggle}>
                  {isAscending ? 'Sort descending' : 'Sort ascending'}
              </button>
              <ol>{sortedMoves}</ol>
          </div>
      </div>
  );
}

export default Game
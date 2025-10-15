function Square({ value, onSquareClick, isWinningSquare }) {
  // A 'winner' class is conditionally added for styling.
  const className = `square ${isWinningSquare ? 'winner' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square
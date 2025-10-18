function Square({ value, onSquareClick, isWinningSquare, isLastMove }) {
  const className = `square ${value ? value : ''} ${isWinningSquare ? 'winner ' + value : ''} ${isLastMove ? 'winner' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
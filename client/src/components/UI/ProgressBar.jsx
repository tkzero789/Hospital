import ProgressBar from "react-bootstrap/ProgressBar";

function ResultBar({ score }) {
  let nowValue;
  const numericScore = parseInt(score, 10); // Ensure score is treated as a number

  if (numericScore <= 5) {
    nowValue = 25;
  } else if (numericScore > 5 && numericScore <= 14) {
    nowValue = 50;
  } else if (numericScore > 14 && numericScore <= 20) {
    nowValue = 75;
  } else {
    nowValue = 100;
  }

  return <ProgressBar now={nowValue} />;
}

export default ResultBar;

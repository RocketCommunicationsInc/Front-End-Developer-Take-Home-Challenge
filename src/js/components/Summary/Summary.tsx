interface SummaryProps {
  count: number;
  text: string;
}

function Summary({ count, text }: SummaryProps) {
  return (
    <div className="summary">
      <span className="summary__count">{count}</span>
      {text}
    </div>
  );
}

export default Summary;

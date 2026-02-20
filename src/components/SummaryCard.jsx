function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <h5 className="summary-label">{label}</h5>
      <h5 className="summary-value">{value}</h5>
    </div>
  );
}

export default SummaryCard;

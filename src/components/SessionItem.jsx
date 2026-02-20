function SessionItem({ topic, duration, type, date }) {
  return (
    <div className="session-item">
      <div>
        <span className="session-title">{topic}</span>
        <span> - </span> <span> {duration} min </span>
        <span className="session-type">({type})</span>
      </div>
      <p className="session-date">{date}</p>
    </div>
  );
}

export default SessionItem;

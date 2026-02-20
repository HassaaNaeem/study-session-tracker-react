import SessionItem from "./SessionItem";

function Sessions({ sessions, onChangeTab, activeCard, activeCardName }) {
  const filteredSessions = sessions.filter((session) =>
    session.buddies.includes(activeCard),
  );
  return (
    <div className="main">
      <button className="back-button" onClick={() => onChangeTab("Dashboard")}>
        Back to Dashboard
      </button>
      <div className="session-card">
        <p>{activeCardName}</p>
        <p>Session history</p>
        {filteredSessions.map((session) => (
          <SessionItem
            key={session.id}
            topic={session.topic}
            duration={session.duration}
            type={session.type}
            date={session.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Sessions;

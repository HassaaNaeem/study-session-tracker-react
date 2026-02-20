function ScheduleCard({
  scheduledSession,
  getBuddies,
  onMarkComplete,
  onAddSession,
}) {
  let { id, topic, date, time, duration, type } = scheduledSession;
  return (
    <div className="schedule-card">
      <div>
        <h3 className="title">
          {topic} - {duration} mins
        </h3>
        <p className="schedule-date">
          {date} {time}
        </p>
        <p className="schedule-buddies">
          With:{" "}
          {getBuddies(id).map((buddy, index) => (
            <span>
              {index > 0 ? "," : ""} {buddy}
            </span>
          ))}{" "}
          - <span>({type})</span>
        </p>
      </div>
      <button
        className="complete-button"
        onClick={() => {
          onMarkComplete(id);
          const newSession = {
            id: crypto.randomUUID(),
            topic: topic,
            duration: duration,
            type: type,
            buddies: scheduledSession.buddies,
            date: date,
          };
          onAddSession(newSession);
        }}
      >
        Mark Complete
      </button>
    </div>
  );
}

export default ScheduleCard;

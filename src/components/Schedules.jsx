import ScheduleCard from "./ScheduleCard";

function Schedules({
  getBuddies,
  scheduledSessions,
  onMarkComplete,
  onAddSession,
}) {
  return (
    <div className="scheduled-section">
      <p>Upcoming Sessions</p>
      {scheduledSessions.map((scheduledSession) => (
        <ScheduleCard
          scheduledSession={scheduledSession}
          getBuddies={getBuddies}
          onMarkComplete={onMarkComplete}
          onAddSession={onAddSession}
        />
      ))}
    </div>
  );
}
export default Schedules;

import SummaryCard from "./SummaryCard";

function Dashboard({ buddies, sessions }) {
  const totalStudyTime = sessions.reduce((acc, session) => {
    return acc + Number(session.duration);
  }, 0);
  return (
    <div>
      <div className="summary">
        <p>Summary</p>
        <div className="summary-grid">
          <SummaryCard
            label={"Total Study Time"}
            value={totalStudyTime + " min"}
          />
          <SummaryCard label={"Study Buddies"} value={buddies.length} />
          <SummaryCard label={"Sessions"} value={sessions.length} />
        </div>
        <div className="top-topics">
          <b>Top Topics:</b> React Hooks Deep Dive, Calculus Problem Set, Group
          Study - Finals Prep
        </div>
      </div>
    </div>
  );
}
export default Dashboard;

import BuddyCard from "./BuddyCard";

function StudyBuddies({
  buddies,
  calculateBalance,
  onChangeTab,
  getActiveCardDetails,
}) {
  return (
    <div className="buddy-grid">
      {buddies.map((buddy) => (
        <BuddyCard
          id={buddy.id}
          name={buddy.name}
          avatar={buddy.avatar}
          expertise={buddy.expertise}
          balance={calculateBalance(buddy.id)}
          onChangeTab={onChangeTab}
          getActiveCardDetails={getActiveCardDetails}
        />
      ))}
    </div>
  );
}

export default StudyBuddies;

function BuddyCard({
  id,
  name,
  avatar,
  expertise,
  balance,
  onChangeTab,
  getActiveCardDetails,
}) {
  const onBuddyCardClick = () => {
    getActiveCardDetails(id, name);
    onChangeTab("Sessions");
  };
  return (
    <div className="buddy-card" onClick={onBuddyCardClick}>
      <div className="buddy-avatar">
        {avatar ? (
          <img src={avatar} alt="" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            <p>{name.split("")[0]}</p>
          </div>
        )}
      </div>
      <p className="buddy-name">{name}</p>
      <p className="expertise">{expertise}</p>
      {balance > 0 && (
        <p className="balance-positive">
          {name.split(" ")[0]} owes you {Math.abs(balance)} mins
        </p>
      )}
      {balance < 0 && (
        <p className="balance-negative">
          You owe {name.split(" ")[0]} {Math.abs(balance)} mins
        </p>
      )}
      {balance == 0 && <p className="balance-neutral">All Balanced</p>}
    </div>
  );
}
export default BuddyCard;

function Header({ onChangeTab, activeTab }) {
  return (
    <div className="header">
      <h1 className="title">Study Buddy Tracker</h1>
      <div className="nav">
        <button
          // className="nav-button-active"
          className={
            activeTab == "Dashboard" ? "nav-button-active" : "nav-button"
          }
          onClick={() => onChangeTab("Dashboard")}
        >
          Dashboard
        </button>
        <button
          className={
            activeTab == "Add Buddy" ? "nav-button-active" : "nav-button"
          }
          onClick={() => onChangeTab("Add Buddy")}
        >
          Add Buddy
        </button>
        <button
          className={
            activeTab == "Log Session" ? "nav-button-active" : "nav-button"
          }
          onClick={() => onChangeTab("Log Session")}
        >
          Log Session
        </button>
        <button
          className={
            activeTab == "Schedule" ? "nav-button-active" : "nav-button"
          }
          onClick={() => onChangeTab("Schedule")}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}

export default Header;

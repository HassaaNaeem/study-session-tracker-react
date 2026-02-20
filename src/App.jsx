import { use, useState } from "react";
import {
  initialBuddies,
  initialSessions,
  initialScheduledSessions,
} from "./Data.js";
// const initialBuddies = [
//   {
//     id: crypto.randomUUID(),
//     name: "Sarah Johnson",
//     image: "https://i.pravatar.cc/150?img=1",
//     expertise: "React & JavaScript",
//     sessions: [
//       {
//         id: crypto.randomUUID(),
//         topic: "React Hooks Deep Dive",
//         duration: 90, // in minutes
//         type: "learning", // you learned from them
//         date: "2026-02-15",
//         participants: ["Sarah Johnson"],
//       },
//       {
//         id: crypto.randomUUID(),
//         topic: "State Management Patterns",
//         duration: 60,
//         type: "collaborative",
//         date: "2026-02-14",
//         participants: ["Sarah Johnson"],
//       },
//       {
//         id: crypto.randomUUID(),
//         topic: "CSS Flexbox Basics",
//         duration: 45,
//         type: "teaching", // you taught them
//         date: "2026-02-12",
//         participants: ["Sarah Johnson"],
//       },
//     ],
//     balance: 45, // positive = they owe you time, negative = you owe them
//   },
//   {
//     id: crypto.randomUUID(),
//     name: "Mike Chen",
//     image: "https://i.pravatar.cc/150?img=12",
//     expertise: "Python & Data Science",
//     sessions: [
//       {
//         id: crypto.randomUUID(),
//         topic: "Python Basics",
//         duration: 120,
//         type: "learning",
//         date: "2026-02-16",
//         participants: ["Mike Chen"],
//       },
//       {
//         id: crypto.randomUUID(),
//         topic: "HTML Semantic Tags",
//         duration: 30,
//         type: "teaching",
//         date: "2026-02-13",
//         participants: ["Mike Chen"],
//       },
//     ],
//     balance: -90,
//   },
//   {
//     id: crypto.randomUUID(),
//     name: "Emma Wilson",
//     image: "https://i.pravatar.cc/150?img=5",
//     expertise: "Node.js & Backend",
//     sessions: [
//       {
//         id: crypto.randomUUID(),
//         topic: "Express.js Fundamentals",
//         duration: 75,
//         type: "learning",
//         date: "2026-02-15",
//         participants: ["Emma Wilson"],
//       },
//       {
//         id: crypto.randomUUID(),
//         topic: "Git & GitHub Workflow",
//         duration: 50,
//         type: "teaching",
//         date: "2026-02-11",
//         participants: ["Emma Wilson"],
//       },
//       {
//         id: crypto.randomUUID(),
//         topic: "RESTful API Design",
//         duration: 90,
//         type: "collaborative",
//         date: "2026-02-10",
//         participants: ["Emma Wilson"],
//       },
//     ],
//     balance: 0,
//   },
// ];

function App() {
  const [buddies, setBuddies] = useState(initialBuddies);
  const [sessions, setSessions] = useState(initialSessions);
  const [scheduledSessions, setScheduledSessions] = useState(
    initialScheduledSessions,
  );
  const [activeCard, setActiveCard] = useState(0);
  const [activeCardName, setActiveCardName] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");

  function changeTab(tab) {
    setActiveTab(tab);
  }

  const calculateBalance = (buddyId) => {
    let balance = 0;
    sessions.forEach((session) => {
      if (session.buddies.includes(buddyId)) {
        const duration = parseInt(session.duration);
        if (session.type == "teaching") {
          balance += duration;
        } else if (session.type == "learning") {
          balance -= duration;
        }
      }
    });
    return balance;
  };
  const getBuddies = (scheduleId) => {
    let buddyList = [];
    console.log(scheduledSessions);
    scheduledSessions.forEach((session) => {
      if (session.id == scheduleId) {
        session.buddies.forEach((buddyId) => {
          buddies.forEach((buddy) => {
            if (buddyId == buddy.id) {
              buddyList.push(buddy.name);
            }
          });
        });
      }
    });
    return buddyList;
  };
  console.log(getBuddies(201));

  function addBuddy(newBuddy) {
    setBuddies((buddies) => [...buddies, newBuddy]);
  }

  const handleScheduleSession = (newScheduleSession) => {
    setScheduledSessions((scheduledSessions) => [
      ...scheduledSessions,
      newScheduleSession,
    ]);
    console.log(scheduledSessions);
  };

  const onAddSession = (newSession) => {
    setSessions((prevSessions) => [...prevSessions, newSession]);
  };

  function getActiveCardDetails(id, name) {
    setActiveCard(id);
    setActiveCardName(name);
  }

  return (
    <div className="container">
      <Header onChangeTab={changeTab} activeTab={activeTab} />
      {activeTab == "Dashboard" && (
        <div className="main">
          <Dashboard buddies={buddies} sessions={sessions} />
          <StudyBuddies
            buddies={buddies}
            calculateBalance={calculateBalance}
            onChangeTab={changeTab}
            getActiveCardDetails={getActiveCardDetails}
          />
          <Schedules
            getBuddies={getBuddies}
            scheduledSessions={scheduledSessions}
          />
        </div>
      )}
      {activeTab == "Add Buddy" && <AddBuddyForm onAddBuddy={addBuddy} />}
      {activeTab == "Log Session" && (
        <StudySessionForm buddies={buddies} onAddSession={onAddSession} />
      )}
      {activeTab == "Schedule" && (
        <ScheduleForm
          buddies={buddies}
          onAddScheduleSession={handleScheduleSession}
        />
      )}
      {activeTab == "Sessions" && (
        <Sessions
          sessions={sessions}
          onChangeTab={changeTab}
          activeCard={activeCard}
          activeCardName={activeCardName}
        />
      )}
    </div>
  );
}

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

function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <h5 className="summary-label">{label}</h5>
      <h5 className="summary-value">{value}</h5>
    </div>
  );
}

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

function Schedules({ getBuddies, scheduledSessions }) {
  return (
    <div className="scheduled-section">
      <p>Upcoming Sessions</p>
      {scheduledSessions.map((scheduledSession) => (
        <ScheduleCard
          id={scheduledSession.id}
          topic={scheduledSession.topic}
          date={scheduledSession.date}
          time={scheduledSession.time}
          buddies={getBuddies}
        />
      ))}
    </div>
  );
}

function ScheduleCard({ id, topic, date, time, buddies }) {
  return (
    <div className="schedule-card">
      <div>
        <h3 className="title">{topic}</h3>
        <p className="schedule-date">
          {date} {time}
        </p>
        <p className="schedule-buddies">
          With:{" "}
          {buddies(id).map((buddy, index) => (
            <span>
              {index > 0 ? "," : ""} {buddy}
            </span>
          ))}
        </p>
      </div>
      <button className="complete-button">Mark Complete</button>
    </div>
  );
}

function Sessions({ sessions, onChangeTab, activeCard, activeCardName }) {
  const filteredSessions = sessions.filter((session) =>
    session.buddies.includes(activeCard),
  );
  console.log(filteredSessions);
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

function AddBuddyForm({ onAddBuddy }) {
  const [name, setName] = useState("");
  const [URL, setURL] = useState("https://i.pravatar.cc/48");
  const [expertise, setExpertise] = useState("");
  function createNewBuddy(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newBuddy = {
      id: id,
      name: name,
      avatar: URL ? `${URL}?u=${id}` : "",
      expertise: expertise,
    };

    onAddBuddy(newBuddy);
    setName("");
    setURL("https://i.pravatar.cc/48");
    setExpertise("");
  }

  return (
    <div className="form-container">
      <p>Add Study Buddy</p>

      <form action="" className="form" onSubmit={createNewBuddy}>
        <FormGroup
          value={name}
          onChange={(e) => setName(e.target.value)}
          inputType={"text"}
        >
          Name *
        </FormGroup>
        <FormGroup
          inputType={"text"}
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          placeholder={"https://..."}
        >
          Avatar URL
        </FormGroup>
        <FormGroup
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          inputType={"text"}
          placeholder={"e.g., React, Calculus, Biology"}
        >
          Best Subject/Expertise
        </FormGroup>

        <button className="submit-button">Add Buddy</button>
      </form>
    </div>
  );
}

function StudySessionForm({ buddies, onAddSession }) {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [sessionType, setSessionType] = useState("Collaborative");
  const [buddyList, setBuddyList] = useState([]);
  console.log(topic, duration, sessionType, buddyList);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setBuddyList((prev) => [...prev, Number(value)]);
    } else {
      setBuddyList((prev) => prev.filter((item) => item != value));
    }
  };
  return (
    <div className="form-container">
      <p>Log Study Session</p>
      <form
        action=""
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          const newSession = {
            id: crypto.randomUUID(),
            topic: topic,
            duration: duration,
            type: sessionType,
            buddies: buddyList,
            date: new Date(Date.now() + 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          };
          onAddSession(newSession);
        }}
      >
        <FormGroup
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          inputType={"text"}
          placeholder={"e.g., React Hooks, Calculus"}
        >
          Session Topic *
        </FormGroup>
        <FormGroup
          inputType={"number"}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          Duration (minutes) *
        </FormGroup>
        <FormGroup
          select={true}
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          options={[
            "Collaborative (No debt)",
            "Teaching (They owe you)",
            "Learning (You owe them)",
          ]}
        >
          Session Type *
        </FormGroup>

        <div className="form-group">
          <label htmlFor="" className="label">
            Study Buddies Involved *
          </label>
          {buddies.map((buddy) => (
            <CheckboxGroup
              id={buddy.id}
              onCheckboxChange={handleCheckboxChange}
              name={buddy.name}
              value={buddy.id}
              checked={buddyList.includes(buddy.id)}
            />
          ))}
        </div>
        <button className="submit-button">Log Session</button>
      </form>
    </div>
  );
}

function FormGroup({
  children,
  inputType,
  placeholder,
  select,
  options,
  value,
  onChange,
}) {
  return (
    <div className="form-group">
      <label className="label">{children}</label>
      {inputType && (
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          className="input"
          placeholder={placeholder}
        />
      )}
      {select && (
        <select
          name=""
          className="input"
          id=""
          onChange={onChange}
          value={value}
        >
          {options.map((option) => (
            <option value={option.split(" ")[0].toLowerCase()}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function ScheduleForm({ buddies, onAddScheduleSession }) {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [buddyList, setBuddyList] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setBuddyList((prev) => [...prev, Number(value)]);
    } else {
      setBuddyList((prev) => prev.filter((item) => item != value));
    }
  };

  return (
    <div className="form-container">
      <p>Schedule Future Session</p>
      <form
        action=""
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          const newScheduleSession = {
            id: crypto.randomUUID(),
            topic: topic,
            date: date,
            time: time,
            buddies: buddyList,
            completed: false,
          };
          onAddScheduleSession(newScheduleSession);
        }}
      >
        <FormGroup
          inputType={"text"}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={"e.g., Physics Study Group"}
        >
          Session Topic *
        </FormGroup>
        <FormGroup
          inputType={"date"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          Date *
        </FormGroup>
        <FormGroup
          inputType={"time"}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          Time *
        </FormGroup>
        <div className="form-group">
          <label htmlFor="" className="label">
            Study Buddies *
          </label>
          {buddies.map((buddy) => (
            <CheckboxGroup
              id={buddy.id}
              onCheckboxChange={handleCheckboxChange}
              name={buddy.name}
              value={buddy.id}
              checked={buddyList.includes(buddy.id)}
            />
          ))}
        </div>
        <button className="submit-button">Schedule Session</button>
      </form>
    </div>
  );
}

function CheckboxGroup({ id, name, checked, onCheckboxChange, value }) {
  return (
    <div className="checkbox-group">
      <input
        value={value}
        id={id}
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={onCheckboxChange}
      />{" "}
      <label className="checkbox-label" htmlFor={id}>
        {name}
      </label>
    </div>
  );
}

export default App;

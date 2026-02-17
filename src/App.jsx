import { useState } from "react";

const initialBuddies = [
  {
    id: crypto.randomUUID(),
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=1",
    expertise: "React & JavaScript",
    sessions: [
      {
        id: crypto.randomUUID(),
        topic: "React Hooks Deep Dive",
        duration: 90, // in minutes
        type: "learning", // you learned from them
        date: "2026-02-15",
        participants: ["Sarah Johnson"],
      },
      {
        id: crypto.randomUUID(),
        topic: "State Management Patterns",
        duration: 60,
        type: "collaborative",
        date: "2026-02-14",
        participants: ["Sarah Johnson"],
      },
      {
        id: crypto.randomUUID(),
        topic: "CSS Flexbox Basics",
        duration: 45,
        type: "teaching", // you taught them
        date: "2026-02-12",
        participants: ["Sarah Johnson"],
      },
    ],
    balance: 45, // positive = they owe you time, negative = you owe them
  },
  {
    id: crypto.randomUUID(),
    name: "Mike Chen",
    image: "https://i.pravatar.cc/150?img=12",
    expertise: "Python & Data Science",
    sessions: [
      {
        id: crypto.randomUUID(),
        topic: "Python Basics",
        duration: 120,
        type: "learning",
        date: "2026-02-16",
        participants: ["Mike Chen"],
      },
      {
        id: crypto.randomUUID(),
        topic: "HTML Semantic Tags",
        duration: 30,
        type: "teaching",
        date: "2026-02-13",
        participants: ["Mike Chen"],
      },
    ],
    balance: -90,
  },
  {
    id: crypto.randomUUID(),
    name: "Emma Wilson",
    image: "https://i.pravatar.cc/150?img=5",
    expertise: "Node.js & Backend",
    sessions: [
      {
        id: crypto.randomUUID(),
        topic: "Express.js Fundamentals",
        duration: 75,
        type: "learning",
        date: "2026-02-15",
        participants: ["Emma Wilson"],
      },
      {
        id: crypto.randomUUID(),
        topic: "Git & GitHub Workflow",
        duration: 50,
        type: "teaching",
        date: "2026-02-11",
        participants: ["Emma Wilson"],
      },
      {
        id: crypto.randomUUID(),
        topic: "RESTful API Design",
        duration: 90,
        type: "collaborative",
        date: "2026-02-10",
        participants: ["Emma Wilson"],
      },
    ],
    balance: 0,
  },
];

function App() {
  const [buddies, setBuddies] = useState(initialBuddies);
  const [activeTab, setActiveTab] = useState("Dashboard");

  function changeTab(tab) {
    setActiveTab(tab);
  }

  function addBuddy(newBuddy) {
    setBuddies((buddies) => [...buddies, newBuddy]);
  }

  return (
    <div className="container">
      <Header onChangeTab={changeTab} activeTab={activeTab} />
      {activeTab == "Dashboard" && (
        <div>
          <Dashboard />
          <StudyBuddies buddies={buddies} />
        </div>
      )}
      {activeTab == "Add Buddy" && <AddBuddyForm onAddBuddy={addBuddy} />}
      {activeTab == "Log Session" && <StudySessionForm />}
      {activeTab == "Schedule" && <ScheduleForm />}
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

function Dashboard() {
  return (
    <div className="main">
      <div className="summary">
        <p>Summary</p>
        <div className="summary-grid">
          <SummaryCard label={"Total Study Time"} value={0 + " min"} />
          <SummaryCard label={"Study Buddies"} value={0} />
          <SummaryCard label={"Sessions"} value={0} />
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

function StudyBuddies({ buddies }) {
  return (
    <div className="buddy-grid">
      {buddies.map((buddy) => (
        <BuddyCard
          name={buddy.name}
          image={buddy.image}
          expertise={buddy.expertise}
          balance={buddy.balance}
        />
      ))}
    </div>
  );
}

function BuddyCard({ name, image, expertise, balance }) {
  return (
    <div className="buddy-card">
      <div className="buddy-avatar">
        <img src={image} alt="" className="avatar-img avatar-placeholder" />
      </div>
      <p className="buddy-name">{name}</p>
      <p className="expertise">{expertise}</p>
      {balance > 0 && (
        <p className="balance-positive">
          {name.split(" ")[0]} owes you ${Math.abs(balance)}
        </p>
      )}
      {balance < 0 && (
        <p className="balance-negative">
          You owe {name.split(" ")[0]} ${Math.abs(balance)}
        </p>
      )}
      {balance == 0 && <p className="balance-neutral">All Balanced</p>}
    </div>
  );
}

function AddBuddyForm({ onAddBuddy }) {
  const [name, setName] = useState("");
  const [URL, setURL] = useState("");
  const [expertise, setExpertise] = useState("");
  function createNewBuddy(e) {
    e.preventDefault();
    const newBuddy = {
      id: crypto.randomUUID(),
      name: name,
      image: URL,
      expertise: expertise,
      sessions: [
        // {
        //   id: crypto.randomUUID(),
        //   topic: "Python Basics",
        //   duration: 120,
        //   type: "learning",
        //   date: "2026-02-16",
        //   participants: ["Mike Chen"],
        // },
        // {
        //   id: crypto.randomUUID(),
        //   topic: "HTML Semantic Tags",
        //   duration: 30,
        //   type: "teaching",
        //   date: "2026-02-13",
        //   participants: ["Mike Chen"],
        // },
      ],
      balance: 50,
    };

    onAddBuddy(newBuddy);
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

function StudySessionForm() {
  return (
    <div className="form-container">
      <p>Log Study Session</p>
      <form action="" className="form">
        <FormGroup
          inputType={"text"}
          placeholder={"e.g., React Hooks, Calculus"}
        >
          Session Topic *
        </FormGroup>
        <FormGroup inputType={"number"}>Duration (minutes) *</FormGroup>
        <FormGroup
          select={true}
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
          {initialBuddies.map((buddy) => (
            <CheckboxGroup name={buddy.name} />
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
        <select name="" className="input" id="" value={value}>
          {options.map((option) => (
            <option value={option.split(" ")[0].toLowerCase()}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function ScheduleForm() {
  return (
    <div className="form-container">
      <p>Schedule Future Session</p>
      <form action="" className="form">
        <FormGroup inputType={"text"} placeholder={"e.g., Physics Study Group"}>
          Session Topic *
        </FormGroup>
        <FormGroup inputType={"date"}>Date *</FormGroup>
        <FormGroup inputType={"time"}>Time *</FormGroup>
        <div className="form-group">
          <label htmlFor="" className="label">
            Study Buddies *
          </label>
          {initialBuddies.map((buddy) => (
            <CheckboxGroup name={buddy.name} />
          ))}
        </div>
        <button className="submit-button">Schedule Session</button>
      </form>
    </div>
  );
}

function CheckboxGroup({ name }) {
  return (
    <div className="checkbox-group">
      <input type="checkbox" className="checkbox" name="" id="" />{" "}
      <span className="checkbox-label">{name}</span>
    </div>
  );
}

export default App;

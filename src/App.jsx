import { use, useState } from "react";
import {
  initialBuddies,
  initialSessions,
  initialScheduledSessions,
} from "./Data.js";
import Dashboard from "./components/Dashboard.jsx";
import Header from "./components/Header.jsx";
import StudyBuddies from "./components/StudyBuddies.jsx";
import Schedules from "./components/Schedules.jsx";
import Sessions from "./components/Sessions.jsx";
import ScheduleForm from "./components/ScheduleForm.jsx";
import StudySessionForm from "./components/StudySessionForm.jsx";
import AddBuddyForm from "./components/AddBuddyForm.jsx";

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

  function addBuddy(newBuddy) {
    setBuddies((buddies) => [...buddies, newBuddy]);
  }

  const handleScheduleSession = (newScheduleSession) => {
    setScheduledSessions((scheduledSessions) => [
      ...scheduledSessions,
      newScheduleSession,
    ]);
  };

  const onAddSession = (newSession) => {
    setSessions((prevSessions) => [...prevSessions, newSession]);
  };

  function getActiveCardDetails(id, name) {
    setActiveCard(id);
    setActiveCardName(name);
  }

  const handleMarkComplete = (scheduleSessionId) => {
    scheduledSessions.find((scheduleSession) => {
      if (scheduleSession.id == scheduleSessionId) {
        scheduleSession.completed = true;
      }
    });
    setScheduledSessions(
      scheduledSessions.filter(
        (scheduledSession) => scheduleSessionId != scheduledSession.id,
      ),
    );
  };

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
            setScheduledSessions={setScheduledSessions}
            onMarkComplete={handleMarkComplete}
            onAddSession={onAddSession}
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

export default App;

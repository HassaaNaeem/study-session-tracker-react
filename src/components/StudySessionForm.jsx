import { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import FormGroup from "./FormGroup";

function StudySessionForm({ buddies, onAddSession }) {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [sessionType, setSessionType] = useState("Collaborative");
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
          setTopic("");
          setDuration("");
          setSessionType("Collaborative");
          setBuddyList([]);
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

export default StudySessionForm;

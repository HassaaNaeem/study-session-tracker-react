import { useState } from "react";
import FormGroup from "./FormGroup";
import CheckboxGroup from "./CheckboxGroup";

function ScheduleForm({ buddies, onAddScheduleSession }) {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [buddyList, setBuddyList] = useState([]);
  const [sessionType, setSessionType] = useState("Collaborative");

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
            duration: duration,
            type: sessionType,
            buddies: buddyList,
            completed: false,
          };
          onAddScheduleSession(newScheduleSession);

          setTopic("");
          setDate("");
          setTime("");
          setDuration("");
          setSessionType("Collaborative");
          setBuddyList([]);
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
        <FormGroup
          inputType={"number"}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          Duration *
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

export default ScheduleForm;

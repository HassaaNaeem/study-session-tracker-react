import { useState } from "react";
import FormGroup from "./FormGroup";

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

export default AddBuddyForm;

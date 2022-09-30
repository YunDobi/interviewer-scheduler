import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {
  console.log(props)
  
  const [volunteer, setVolunteer] = useState(props.volunteers || "");
  const [title, setTitle] = useState(props.title || "");
  const [interviewer, setInterviewer] = useState(props.waitlist || null);
  const [error, setError] = useState("");
  
  const filterStudent = (list) => {
    let students = []
    // console.log(list)
    if (interviewer === null || undefined) {
      return students;
    } else {
      for (let i = 0; i < list.length; i++) {
        students.push(props.interviewers[i])
      }
      return students;
    }

  }

function reset() {
  setVolunteer("")
  setInterviewer(null)
  setError("")
};

//Cancel from Form
function Cancel() {
  reset()
  return props.onCancel();
}

//validate for Form
function validate() {
  if (title === null) {
    setError("Interviewer cannot be blank");
    return;
  }
  if (title === "") {
    setError("Student name cannot be blank");
    return;
  } 

  setError("");
  
  // props.onTitle((e) => e = title)
  props.onSave(title, interviewer);
}

return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
      {/* input of the Form with name  */}
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value= {title}
        onChange={(event) => setTitle(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={filterStudent(props.volunteers)}
      onChange={setInterviewer}
      value={props.volunteers}
      waitlist={filterStudent(props.waitlist)}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={Cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}
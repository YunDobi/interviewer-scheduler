import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {
  console.log(props)
  
  const filterStudent = (list) => {
    let students = []
    for (let i = 0; i < list.length; i++) {
      students.push(props.interviewers[i])
    }
    return students;
  }

const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");

function reset() {
  setStudent("")
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
  if (interviewer === null) {
    setError("Interviewer cannot be blank");
    return;
  }
  if (student === "") {
    setError("Student name cannot be blank");
    return;
  } 

  setError("");
  props.onSave(student, interviewer);
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
        value= {student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={filterStudent(props.student)}
      onChange={setInterviewer}
      value={props.student}
      waitlist={filterStudent(props.interviewer)}
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
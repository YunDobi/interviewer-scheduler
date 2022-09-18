import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';


export default function InterviewerList (props) {
  return (
    <section className="interviewers">
      <div className="volunteers">
      <h4 className="interviewers__header text--light">Volunteers</h4>
      <ul className="interviewers__list">
      {props.interviewers.map((interviewer)=> {
        return (
        <InterviewerListItem 
          key={interviewer.id}
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer={() => {props.onChange(interviewer.id)}}
          />
        )
      }
      )}
      </ul>
      </div>

{/* this is the waitlist and have to insert the volunteers  */}
      <div className="waitlists">
        <h4 className="interviewers__header text--light">Waitlist</h4>
      </div>
    </section>
    // -----------------------------
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
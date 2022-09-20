import React from 'react';
import Header from "components/Appointment/header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import "components/Appointment/style.scss";
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // useEffect(() => {
  //   if (props.interview && mode === EMPTY) {
  //     console.log(props.interview)
  //     // transition(SHOW)
  //   }
  //   if (props.interview === null && mode === SHOW) {
  //    transition(EMPTY);
  //   }
  //  }, [props.interview, transition, mode]);

  //save the Appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(error => transition(ERROR_SAVE, true));
  }

    //delete for the Show or Form
    function cancel(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      
      };
      transition(DELETE)
      props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY)
      }) 
      .catch(error => transition(ERROR_DELETE, true));
    }
    

    //edit for the Show or Form
    function edit(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      
      };
      transition(EDIT, true)
    }

  //each Mode with components
  return(
<article className="appointment">
  <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={() => {console.log("Clicked onAdd"); transition(CREATE)} } />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM, true)}
      onEdit={edit}
    />)}

  {mode === SAVING && <Status message={"Saving"}/>}

  {mode === DELETE && <Status message={"Deleting"} />}

  {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={() => transition(SHOW)} message={"Are you sure would like to delete?"}/>}

  {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}

  {mode === EDIT && <Form interviewers={props.interviewers} onCancel={() => {transition(SHOW)}} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id}/>}

  {mode === ERROR_SAVE && <Error message={"Failed to save"} onClose={() => transition(SHOW)}/>}
  
  {mode === ERROR_DELETE && <Error message={"Failed to delete"} onClose={() => {transition(SHOW)}}/>}

</article>
  )
}
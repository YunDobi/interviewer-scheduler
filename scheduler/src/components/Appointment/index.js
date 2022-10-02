import React, { useState } from 'react';
import Header from "components/Appointment/header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import "components/Appointment/style.scss";
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import { useLocation } from 'react-router-dom';

export default function Appointment(props) {
  console.log("props", props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  // const [showTitle, setShowTitle] = useState("show")


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save the Appointment
  function save(name, interviewer) {

    const interview = {
      volunteers: [],
      waitlist: [],
    
    };
    transition(SAVING)
    props.bookInterview(props.id, interview, name)
    .then(() => {
      transition(SHOW)
    })
    .catch(error => transition(ERROR_SAVE, true));
  }

    //delete for the Show or Form
    function cancel(name, interviewer) {
      console.log(props)
      const interview = {
        volunteers: [],
        waitlist: []
      
      };
      transition(DELETE)
      props.cancelInterview(props.id)
      .then(() => {
        console.log(props)
        transition(EMPTY)
      }) 
      .catch(error => transition(ERROR_DELETE, true));
    }
    

    //edit for the Show or Form
    function edit(name, interviewer) {
      const interview = {
        volunteers: props.interview.volunteers,
        waitlist: interviewer
        
      };
      transition(SAVING)
      
      if (location.pathname === "/main") {
        console.log(interview.volunteers)
        
        if (interview.volunteers.length < 2) {
          interview.volunteers.push(Number(name))
        } else if (interview.volunteers.length >= 2) {
          if (interview.waitlist.length >= 3) {
            transition(ERROR_SAVE,true)  
          } else {
            interview.waitlist.push(Number(name))
          }
        }
        props.bookInterview(props.id, interview, name)
        .then(() => {        
          transition(SHOW, true)
        })
        .catch(error => transition(ERROR_SAVE, true));


      } else if (interview.volunteers.length === 0) {
        props.cancelInterview(props.id)
        .then (() => {
          props.bookInterview(props.id, interview, name)
          .then(() => {        
            transition(SHOW, true)
          })
          .catch(error => transition(ERROR_SAVE, true));
        })
        .catch(error =>  transition(ERROR_DELETE, true))


      } else {
        props.bookInterview(props.id, interview, name)
        .then(() => {        
          transition(SHOW, true)
        })
        .catch(error => transition(ERROR_SAVE, true));
      }

      //if sending from the main location, it will send the pushed the volunteers, and if it is sending from the admin, then delete the existing row because it will creat by them self. and then creat
      // if (interview.volunteers.length < 2) {
      //   interview.volunteers.push(Number(name))
      // } else if (interview.volunteers.length >= 2) {
      //   if (interview.waitlist.length >= 3) {
      //     transition(ERROR_SAVE,true)  
      //   } else {
      //     interview.waitlist.push(Number(name))
      //   }
      // }
      //------------------------------------------------------
      console.log(interview.volunteers)
    }

    const location = useLocation();

  //each Mode with components
  if (location.pathname === '/admin') {
    return(
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => {console.log("Clicked onAdd"); transition(CREATE)} } admin={true} />}
        {mode === SHOW && (
          <Show
            volunteers={props.interview.volunteers}
            waitlist={props.interview.waitlist}
            onDelete={() => transition(CONFIRM, true)}
            onEdit={() => transition(EDIT, true)}
            allList={props.interviewers}
            title = {props.title}
          />)}
      
        {mode === SAVING && <Status message={"Saving"}/>}
      
        {mode === DELETE && <Status message={"Deleting"} />}
      
        {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={() => transition(SHOW)} message={"Are you sure would like to delete?"}/>}
      
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      
        {mode === EDIT && <Form interviewers={props.interviewers} onCancel={() => {transition(SHOW)}} onSave={edit} volunteers={props.interview.volunteers} waitlist={props.interview.waitlist}/>}
      
        {mode === ERROR_SAVE && <Error message={"Failed to save"} onClose={() => transition(SHOW)}/>}
        
        {mode === ERROR_DELETE && <Error message={"Failed to delete"} onClose={() => {transition(SHOW)}}/>}
      
      </article>
        )






       //main page for volunteers 
  } else {
    return(
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => {console.log("Clicked onAdd"); transition(CREATE)} } admin={false} />}
    {mode === SHOW && (
      <Show
        volunteers={props.interview.volunteers}
        waitlist={props.interview.waitlist}
        onDelete={() => transition(CONFIRM, true)}
        onEdit={() => transition(EDIT, true)}
        allList={props.interviewers}
        title={props.title}
      />)}
  
    {mode === SAVING && <Status message={"Saving"}/>}
  
    {mode === DELETE && <Status message={"Deleting"} />}
  
    {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={() => transition(SHOW)} message={"Are you sure would like to delete?"}/>}
  
    {/* {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} title={props.title} />} */}
  
    {mode === EDIT && <Form interviewers={props.interviewers} onCancel={() => {transition(SHOW)}} onSave={edit} volunteers={props.interview.volunteers} waitlist={props.interview.waitlist}/>}
      
  
    {mode === ERROR_SAVE && <Error message={"Failed to save"} onClose={() => transition(SHOW)}/>}
    
    {mode === ERROR_DELETE && <Error message={"Failed to delete"} onClose={() => {transition(SHOW)}}/>}
  
  </article>
    )

  }
}
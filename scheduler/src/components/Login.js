import { useApplicationData } from 'hooks/useApplicationData';
import React, { useState } from 'react'
import DayList from './DayList';
import "components/Application.scss";
import Button from './Button';
import './login.scss';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const {
    state,
    setDay,
  } = useApplicationData();
  const [student, setStudent] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const navigateFilter = (name) => {
    if (name === "admin") {
      navigate("/main")
    } else {
      navigate("/")
    }
  }


  return (
    <main className="layout">
    <section className="sidebar">
        
    <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
    />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList 
        days={state.days} 
        value={state.day} 
        onChange={setDay} 
      />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />

    </section>

    <section className='LoginContainer'>
      <h3 className='title'>LOGIN</h3>
      <form autoComplete="off" className='LoginBody'>
      {/* input of the Form with name  */}
      <input
        className="login_name"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value= {student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"
      />
      <input
        className="login_name"
        name="password"
        type="text"
        placeholder="Enter Student password"
        value= {password}
        onChange={(event) => setPassword(event.target.value)}
        data-testid="student-name-input"
      />
      <Button confirm onClick={() => navigateFilter(student)}>Login</Button>
    </form>
    </section>
    </main>
  )
}
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApplicationData() {
 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  

  const setDay = day => setState((prev) => ({...prev, day}));

  function updateSpots(id) {
    axios.get(`/api/days/`)
    .then((res) => {
      setState((prev) => ({...prev, days: res.data})
    )})
  }



//bookInterview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {setState((prev => ({...prev, appointments})));
    updateSpots(id);
    })
  }

  //cancelInterview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: { interview: null }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then((response) => {setState((prev => ({...prev, appointments})));
    updateSpots(id);
    })
  }

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
    
      const [first, second, third] = all;
      // console.log(first.data, second.data, third.data)
    
      setState((prev) => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}));
    });
  },[])

  return {state, setDay, bookInterview, cancelInterview, updateSpots}
};

export function getAppointmentsForDay (state, day) {
  let filterAppointment = [];
  const filteredDays = state.days.filter(user => user.name === day);
  // console.log(state)
  // console.log(filteredDays)

  //pushing the day's appointments
  if (filteredDays.length === 0) {
    return [];
  } else {
    for (let appID in state.appointments) {
      if (filteredDays[0].id === state.appointments[appID].day_id)
        filterAppointment.push(state.appointments[appID])
    }
    console.log(filterAppointment)
    return filterAppointment;
  }

};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const id = interview.interviewer
  const interviewer = state.interviewers[id]
  const result = {...interview, interviewer}

  return result;
};

export function getInterviewerForDay (state, day) {
  console.log(state)
  let filteredInterviewer = [];
  const filteredDays = state.days.filter(user => user.name === day);

  if (filteredDays.length !== 0) {
    for (let appID in state.interviewers) {
      filteredInterviewer.push(state.interviewers[appID])
    }
    return filteredInterviewer;
  } else {
    return filteredInterviewer;
  }
}
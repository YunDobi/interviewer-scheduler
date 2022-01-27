export function getAppointmentsForDay (state, day) {
  let filterAppointment = [];
  const filteredDays = state.days.filter(user => user.name === day);

  if (filteredDays.length === 0) {
    return [];
  } else {
    for (let appID of filteredDays[0].appointments) {
      filterAppointment.push(state.appointments[appID])
    }
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
  let filteredInterviewer = [];
  const filteredDays = state.days.filter(user => user.name === day);

  if (filteredDays.length !== 0) {
    for (let appID of filteredDays[0].interviewers) {
      filteredInterviewer.push(state.interviewers[appID])
    }
    return filteredInterviewer;
  } else {
    return filteredInterviewer;
  }
}
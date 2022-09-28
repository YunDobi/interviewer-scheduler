import React from "react";

export default function Show (props) {
  console.log("Show",props)
  const allList = props.allList
  
  const nameFilter = (idArray) => {
    let givenName = ""
    if (idArray === null) {
      return givenName;
    }
    for (let i = 0; i < idArray.length; i++) {
      givenName += allList[i].name;
      if (i !== idArray.length -1) {
        givenName += ", "
      }
    }
    return givenName
  }

  return (
    <main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
{/* -- */}
    <h2 className="text--regular">{nameFilter(props.volunteers)}</h2>
    {/* -- */}
    <section className="interviewer" style={{display: "flex"}}>
      <h4 className="text--light">Volunteers:  </h4>
      <h3 className="text--regular">{nameFilter(props.volunteers)}</h3>
      <h4 className="text--light">Waitlist:  </h4>
      <h3 className="text--regular">{nameFilter(props.waitlist)}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onClick={props.onEdit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onClick={props.onDelete}
      />
    </section>
  </section>
</main>

  )
};
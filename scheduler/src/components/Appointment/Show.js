import React from "react";
import { useLocation } from "react-router-dom";

export default function Show (props) {
  console.log("Show",props)
  const allList = props.allList
  
  const nameFilter = (idArray) => {
    let givenName = ""
    if (idArray === undefined|| idArray.length === 0) {
      return givenName;
    }
    for (let i = 0; i < idArray.length; i++) {
      console.log(idArray[i])
      if (allList[idArray[i] - 1] === undefined) {
        return props.title
      }
      givenName += allList[idArray[i] - 1].name;
      if (i !== idArray.length -1) {
        givenName += ", "
      }

    }
    return givenName
  }

  const location = useLocation();

  const imagesController = () => {
    if (location.pathname === "/admin") {
      return (
        <>
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit} />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete} />
        </>
      )
    } else {
      return (
        <>
        <img
          className="appointment__actions-button"
          src="images/edit.png"
          alt="Edit"
          onClick={props.onEdit} />
      </>
      )
    } 
  }
  

  return (
    <main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
{/* -- */}
    <h2 className="text--regular">{props.title}</h2>
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
    {imagesController()}
  </section>
  </section>
</main>

  )
};
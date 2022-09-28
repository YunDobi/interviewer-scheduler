import React from 'react';

export default function Empty(props) {
  if (props.admin) {
    return(
      <main className="appointment__add">
        <img
          className="appointment__add-button"
          src="images/add.png"
          alt="Add"
          onClick={props.onAdd}
          style={{scale: 0.2}}
        />
      </main>
    )
  } else {
    return(
      <main className="appointment__add">
        {/* <img
          className="appointment__add-button"
          src="images/add.png"
          alt="Add"
          onClick={props.onAdd}
          style={{scale: 0.2}}
        /> */}
      </main>
    )
  }
}
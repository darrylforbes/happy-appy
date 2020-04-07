import React from 'react';
import './Reflection.css';

const Reflection = (props) => {
  const clickListing = (event) => {
    alert(JSON.stringify(props.reflection));
  }

  return (
    <div className="reflection" onClick={clickListing}>
      <h1>Title: {props.reflection.title}</h1>
      <h2>From: {props.reflection.author}</h2>
      <h2>To: {props.reflection.recipient}</h2>
      <p>{props.reflection.content}</p>
    </div>
  );
}

export default Reflection;

import React from 'react';
import './Letter.css';

const Letter = (props) => {
  const clickListing = (event) => {
    alert(JSON.stringify(props.letter));
  }

  return (
    <div className="letter" onClick={clickListing}>
      <h1>Title: {props.letter.title}</h1>
      <h2>From: {props.letter.author}</h2>
      <h2>To: {props.letter.recipient}</h2>
      <p>{props.letter.content}</p>
    </div>
  );
}

export default Letter;

import React from 'react';
import './Letter.css';

const Letter = (props) => {
  const clickListing = (event) => {
    alert(JSON.stringify(props.letter));
  }

  return (
    <div className="letter" onClick={clickListing}>
      <h1>Letter</h1>
    </div>
  );
}

export default Letter;

import React, { useState } from 'react';
import logo from './logo.svg';
import Letter from './Letter';
import Form from './Form';
import './App.css';

const App = () => {
  const [letters, setLetters] = useState();

  const getServer = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'http://openwhen.darrylforbes.me';
    }
    else {
        return 'http://127.0.0.1';
    }
  }

  const onClickGet = () => {
    console.log('GET Listings');
    let server = getServer();
    fetch(server + '/api/letters/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLetters(data.map((ltr, index) => {
          return <Letter letter={ltr} key={index}/>
        }));
      });
  }

  const onClickPost = () => {
    console.log('POST Listings')
    let server = getServer();
    fetch(server + '/api/letters')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLetters(data.map((ltr, index) => {
          return <Letter letter={ltr} key={index}/>
        }));
      });
  }

  return (
    <div>
      <button type="button" onClick={onClickGet}>Send GET request</button>
      <button type="button" onClick={onClickPost}>Send POST request (form not yet implemented)</button>
      <div id="letter-previews">{letters}</div>
    </div>
  );
}

export default App;

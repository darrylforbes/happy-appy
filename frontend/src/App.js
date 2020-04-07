import React, { useState } from 'react';
import logo from './logo.svg';
import Reflection from './Reflection';
import Form from './Form';
import './App.css';

const App = () => {
  const [reflections, setReflections] = useState();

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
    fetch(server + '/api/reflections/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReflections(data.map((ltr, index) => {
          return <Reflection reflection={ltr} key={index}/>
        }));
      });
  }

  return (
    <div>
      <Form server={getServer() + "/api/reflections/"} />
      <button type="button" onClick={onClickGet}>Send GET request</button>
      <div id="reflection-previews">{reflections}</div>
    </div>
  );
}

export default App;

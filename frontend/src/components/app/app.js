import React, { useState } from 'react';
import logo from '../../logo.svg';
import Reflection from '../reflection/reflection';
import Form from '../form/form';
import Login from '../login/login';
import './app.css';

const App = () => {
  const [reflections, setReflections] = useState();

  const getCookie = () => {
    let cookie = document.cookie.split('; ').find(row => row.startsWith('token'))
    if (typeof(cookie) === 'undefined') {
      return null;
    }
    else {
      return cookie.split('=')[1];
    }
  }

  const [JWT, setJWT] = useState(getCookie());

  const getServer = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'https://happyappy.darrylforbes.me';
    }
    else {
        return 'http://127.0.0.1';
    }
  }

  const onClickGet = () => {
    let server = getServer();
    fetch(server + '/api/reflections/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JWT}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        for (let index of data) {
          setReflections(data.map((ltr, index) => {
            return <Reflection reflection={ltr} key={index} />
          }));
        };
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div>
      <Login server={getServer() + "/api/token/"} setToken={setJWT} />
      <Form server={getServer() + "/api/reflections/"} token={JWT} />
      <button type="button" onClick={onClickGet}>Send GET request</button>
      <div id="reflection-previews">{reflections}</div>
    </div>
  );
}

export default App;

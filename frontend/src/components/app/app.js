import React, { useState } from 'react';
import logo from '../../logo.svg';
import Reflection from '../reflection/reflection';
import Form from '../form/form';
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
        return 'https://openwhen.darrylforbes.me';
    }
    else {
        return 'http://127.0.0.1';
    }
  }

  const onClickGet = () => {
    console.log('GET Listings');
    let server = getServer();
    fetch(server + '/api/users/6', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JWT}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.reflections);
        for (let index of data.reflections) {
          console.log(index)
          fetch(server + `/api/reflections/${index}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${JWT}`
            },
            redirect: 'follow'
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
            })
        }
        // setReflections(data.map((ltr, index) => {
        //   return <Reflection reflection={ltr} key={index}/>
        // }));
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const getJWT = () => {
    let server = getServer();
    fetch(server + '/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': 'test3', 'password': 'testuser'})
    })
      .then((response) => response.json())
      .then((data) => {
        setJWT(data.access)
        document.cookie = `token=${data.access}`
      });
  }

  return (
    <div>
      <Form server={getServer() + "/api/reflections/"} />
      <button type="button" onClick={onClickGet}>Send GET request</button>
      <button type="button" onClick={getJWT}>Get JWT</button>
      <div id="reflection-previews">{reflections}</div>
    </div>
  );
}

export default App;

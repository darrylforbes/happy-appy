import React, { useState } from 'react';
import './login.css';

const Login = (props) => {
  const [values, setValues] = useState({ username: '', password: '' })

  const handleSubmit = (event) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    fetch(props.server, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        props.setToken(data.access)
        document.cookie = `token=${data.access}`
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  }

  const handleChange = (event) => {
    let oldValues = values;
    oldValues[event.target.name] = event.target.value;
    setValues(oldValues);
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <label className="form-input">
        Username: <input type="text" name="username" onChange={handleChange} />
      </label>
      <label className="form-input">
        Password: <input type="text" name="password" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Login;

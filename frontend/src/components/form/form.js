import React, { useState } from 'react';
import './form.css';

const Form = (props) => {
  const [values, setValues] = useState({ title: '', recipient: '', content: '' })

  const handleSubmit = (event) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    fetch(props.server, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.token}`
      },
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => alert('Success:', data))
    //.then(() => window.location.reload(false))
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
        Title: <input type="text" name="title" onChange={handleChange} />
      </label>
      <label className="form-input">
        Recipient: <input type="text" name="recipient" onChange={handleChange} />
      </label>
      <label className="form-input">
        Content: <input type="text" name="content" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Form;

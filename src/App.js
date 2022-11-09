import { useEffect, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState('Please enter a first name');
  const [lastNameError, setLastNameError] = useState('Please enter a last name');
  const [emailError, setEmailError] = useState('Please enter a email');
  const [formValid, setFormValid] = useState(false);

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    if(e.target.value.length < 3) {
      setFirstNameError('First Name is short');
    } else {
        setFirstNameError('');
    }
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    if(e.target.value.length < 3) {
      setLastNameError('Last Name is short');
    } else {
        setLastNameError('');
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect email');
    } else {
        setEmailError('');
    }
  };

  useEffect(() => {
    if (firstNameError || lastNameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };

  }, [firstName, lastName, email])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'firstName' :
        setFirstNameDirty(true);
        break;
      case 'lastName' :
        setLastNameDirty(true);
        break;
      case 'email' :
        setEmailDirty(true);
        break;
    }
  }

  return (
    <div className="App">
      <Form>
        <h1>Registration</h1>
        <div className='lines'>
          <div className='columns'>
              <Form.Label>First name</Form.Label>
            <div className='firstName'>
              <Form.Control value={firstName} onBlur={e => {blurHandler(e)}} name='firstName' type='text' placeholder='First Name' onChange={e => {firstNameHandler(e)}}/>
              {(firstNameDirty && firstNameError) && <div style={{color: 'red'}}>{firstNameError}</div>}
            </div>
              <Form.Label>Last name</Form.Label>
            <div className='lastName'>
              <Form.Control value={lastName} onBlur={e => {blurHandler(e)}} name='lastName' type='text' placeholder='Last Name' onChange={e => {lastNameHandler(e)}}/>
              {(lastNameDirty && lastNameError) && <div style={{color: 'red'}}>{lastNameError}</div>}
            </div>
            <Form.Label>Email address</Form.Label>
            <div className='email'>
              <Form.Control value={email} onBlur={e => {blurHandler(e)}} name='email' type='text' placeholder='Email' onChange={e => {emailHandler(e)}}/>
              {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
            </div>
            <Button variant="success" disabled={!formValid} type='submit'>Register</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../styles.scss';
import PlaidButton from '../components/PlaidButton.jsx'

const Login = () => {

  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);  /// send data to Auth for verification
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  //check if username exists
  // if it does exist, retrieve row from database with hash. 
  // move on to the next middleware function that compares plaintext pw with hash. 

  const clickHandler = (e) => {
    console.log('enters click handler')
    fetch('/bcrypt/check_pw', {
      method: 'POST',
      body: JSON.stringify({
        username: {username},
        password: {password}
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      if (result){
        console.log('success')
      } else {
        alert('Invalid username or password')
      }
    })
  }

 
  return (
  <div>
  <div className="login">
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Username</h3>
      <input name="username" ref={register({ required: true })} placeholder="put username here" onChange={(e) => setUsername(e.target.value)}/> {/* register an input */}
      <h3>Password</h3>
      <input name="password" ref={register({ required: true })} placeholder = "password" onChange={(e) => setPassword(e.target.value)}/>
      {errors.username && 'Username is required.'}
      {errors.password && 'Password is required.'}
      <input className = "submit" type="submit" onClick={clickHandler} />
    </form>
  </div>
    <PlaidButton />
  </div>
 )
}





export default Login;
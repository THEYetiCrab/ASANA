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

 
  return (
  <div>
  <div className="login">
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Username</h3>
      <input name="username" ref={register({ required: true })} placeholder="put username here"/> {/* register an input */}
      <h3>Password</h3>
      <input name="password" ref={register({ required: true })} placeholder = "password"/>
      {errors.username && 'Username is required.'}
      {errors.password && 'Password is required.'}
      <Link to='/landing'>
      <input className = "submit" type="submit" />
      </Link>
    </form>
  </div>
    <PlaidButton />
  </div>
 )
}





export default Login;
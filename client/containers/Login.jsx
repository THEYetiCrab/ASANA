import React, { useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import '../styles.scss';

function Login () {

  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);  /// send data to Auth for verification
  };


 return (
  <div className="login">
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Username</h3>
      <input name="username" ref={register({ required: true })} placeholder="put username here"/> {/* register an input */}
      <h3>Password</h3>
      <input name="password" ref={register({ required: true })} placeholder = "password"/>
      {errors.username && 'Username is required.'}
      {errors.password && 'Password is required.'}
      <input className = "submit" type="submit" />
    </form>
  </div>
 )
}





export default Login;
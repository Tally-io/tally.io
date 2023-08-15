import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  const handleLogin = (e) => {
    //prevents default form submission
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('form data', formData);
    const emailVal = formData.get('loginEmail');
    const passVal = formData.get('loginPassword');
    //ENTER LOGIN LOGIC HERE, if logic passes, navigate to /home endpoint
    navigate('/home');
  };

  const handleSignup = () => {
    //ENTER SIGN UP LOGIC HERE, if signup logic is successful navigate to /home endpoint

    navigate('/home');
  };
  return (
    <div className='loginPage-container'>
      <h1>Tally.io</h1>
      <div className='login-container'>
        <form onSubmit={handleLogin}>
          <input
            className='login-input'
            type='email'
            placeholder='Enter Email'
            name='loginEmail'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            className='login-input'
            type='password'
            placeholder='Enter Password'
            name='loginPassword'
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
      <div className='signUp-container'>
        <form onSubmit={handleSignup}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Landing;

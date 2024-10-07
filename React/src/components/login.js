import React, { useEffect, useState } from 'react';
import './login.css';
import { FaGithub, FaUserAstronaut, FaGoogle } from 'react-icons/fa';
import { Si42 } from 'react-icons/si';
import { useGoogleLogin } from '@react-oauth/google';
import {switchToSignIn, switchToSignUp ,gitHubLogin ,handleLoginClick } from './utils';
import { displayError, displaySuccess } from './utils';

function Login() {
  const [csrfToken, setCsrfToken] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
    password: ''
  });

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      displayError('.header-error1', 'Passwords do not match');
      return;
    }
    const form = new URLSearchParams();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('/registeruser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': csrfToken,
        },
        body: form.toString()
      });

      const res = await response.json();
      if (!res.status) {
        displayError('.header-error1', res.error.username || res.error.email);
        return;
      }
      displaySuccess('.header-error1', 'Account created successfully');
      resetForm();
      switchToSignIn();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const form = new URLSearchParams();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        form.append(key, formData[key]);
      }
    }
    try {
      const response = await fetch('/loginuser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': csrfToken,
        },
        body: form.toString()
      });
      const res = await response.json();
      if (!res.status) {
        displayError('.header-error', 'Invalid credentials');
        resetForm();
        return;
      }
      window.location.href = '/signin';
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem('google_token', JSON.stringify(codeResponse));
      window.location.href = '/auth/google';
    },
    onError: (error) => {
      console.error('Error:', error);
    }
  });

  useEffect(() => {
    fetch('/api/csrf-token/')
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => console.error('Error fetching CSRF token:', error));
  }, []);

  const resetForm = () => {
    setFormData({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
      password: ''
    });
  };


  return (
    <div className='danone'>
      <div className="App">
        <div className="App-header">
          <FaUserAstronaut />
        </div>
        <div className="App-body">
          <div className='forms-container'>
            <div className='signup'>
              <p className='header-error1'></p>
              <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder="Username" required value={formData.username || ''} onChange={handleChange} />
                <input type="text" name='first_name' placeholder="First Name" required value={formData.first_name || ''} onChange={handleChange} />
                <input type="text" name='last_name' placeholder="Last Name" required value={formData.last_name || ''} onChange={handleChange} />
                <input type="email" name='email' placeholder="Email" required value={formData.email || ''} onChange={handleChange} />
                <input type="password" name='password1' placeholder="Password" required value={formData.password1 || ''} onChange={handleChange} />
                <input type="password" name='password2' placeholder="Confirm Password" required value={formData.password2 || ''} onChange={handleChange} />
                <button className="btn" type="submit">Sign Up</button>
              </form>
              <p className='par'>Already have an account? <a href='#sign-in' onClick={switchToSignIn}>Sign In</a></p>
            </div>
            <div className='signin active'>
              <p className='header-error'></p>
              <form onSubmit={handleSubmit2}>
                <input type="text" name='username' placeholder="Username" required value={formData.username || ''} onChange={handleChange} />
                <input type="password" name='password' placeholder="Password" required value={formData.password || ''} onChange={handleChange} />
                <button className="btn" type="submit">Sign In</button>
              </form>
              <p className='par'>Don't have an account? <a href='#sign-up' onClick={switchToSignUp}>Sign Up</a></p>
            </div>
          </div>
          <div className='social-buttons'>
            <div className='intra'>
              <button className="social-btn" onClick={handleLoginClick}>
                <Si42 /> Intra
              </button>
            </div>
            <div className='google'>
              <button className="social-btn" onClick={login}>
                <FaGoogle /> Google 
              </button>
            </div>
            <div className='github'>
              <button className="social-btn" onClick={gitHubLogin}>
                <FaGithub /> Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
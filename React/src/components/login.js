import React from 'react';
import './login.css';
import { FaUserAstronaut} from 'react-icons/fa';
import { Si42 } from 'react-icons/si';

function Login() {
  const handleLoginClick = () => {
    window.location.href = '/auth/redirect/';
  };
  
  return (
    <div className='danone'>
      <div className="App">
        <div className="App-header">
          <FaUserAstronaut />
        </div>
        <div className="App-body">
          <div className='social-buttons'>
            <div className='intra'>
              <button className="social-btn" onClick={handleLoginClick}>
                <Si42 /> Intra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
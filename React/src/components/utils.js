
export const switchToSignIn = () => {
    const signin = document.querySelector('.signin');
    const signup = document.querySelector('.signup');
    signup.classList.remove('active');
    signin.classList.add('active');
    const socialButtons = document.querySelector('.social-buttons');
    socialButtons.style.display = 'flex';
  };


export const switchToSignUp = () => {
    const signin = document.querySelector('.signin');
    const signup = document.querySelector('.signup');
    signin.classList.remove('active');
    signup.classList.add('active');
    const socialButtons = document.querySelector('.social-buttons');
    socialButtons.style.display = 'none'; 
  };


  
  
  export const handleLoginClick = () => {
    window.location.href = '/auth/redirect/';
  };
  
  export const gitHubLogin = () => {
    const client_id="Ov23liYPD8NVQWrAbyOy"
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('github', state);
    const link = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=https://localhost/auth/github&state=${state}`;
    window.location.href = link;
  };
  
  
  
  export const displaySuccess = (selector, message) => {
    const element = document.querySelector(selector);
    element.innerHTML = message;
    element.style.color = 'green';
  };
  
  export const displayError = (selector, message) => {
      const element = document.querySelector(selector);
      element.innerHTML = message;
      element.style.color = 'red';
    }
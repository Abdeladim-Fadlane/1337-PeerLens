
// import './promo.css';
import { useEffect } from 'react';
const Intra = () => {
  useEffect (() => {
      const queryString = window.location.search;
      const parcetoken = queryString.split('=')[1];
      localStorage.setItem('accessToken', parcetoken);
      const fetchData = async () => {
      try {
          const response = await fetch('https://garb-anzo.tech/auth/user/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: parcetoken }) 
            }
          );
          
          if (response.status === 401) {
              window.location.href = '/';
          }
          const data = await response.json();
          localStorage.setItem('Data', JSON.stringify(data));
          localStorage.setItem('Type', JSON.stringify('intra'));
          window.location.href = '/user';
      } catch (error) {
          console.error('Failed to fetch user data', error);
      }};
      fetchData();
    }, []);
    
};

export default Intra;

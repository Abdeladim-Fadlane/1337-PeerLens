
// import './promo.css';
import { useEffect } from 'react';
const Intra = () => {
  useEffect (() => {
      const fetchData = async () => {
      try {
          const response = await fetch('https://localhost/api/user/');
          if (response.status === 401) {
              window.location.href = '/';
          }
          const data = await response.json();
          localStorage.setItem('Data', JSON.stringify(data));
          localStorage.setItem('Type', JSON.stringify('intra'));
          console.log('Data:', data);
          window.location.href = '/user';
      } catch (error) {
          console.error('Failed to fetch user data', error);
      }};
      fetchData();
    }, []);

};

export default Intra;
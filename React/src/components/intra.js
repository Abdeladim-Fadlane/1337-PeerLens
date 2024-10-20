
// import './promo.css';
import { useEffect } from 'react';
const Intra = () => {
  useEffect (() => {
        // get the query string from the URL
      const queryString = window.location.search;

      const parcetoken = queryString.split('=')[1];
      localStorage.setItem('accessToken', parcetoken);

        // get from the local storage
        


      const fetchData = async () => {
      try {
          const response = await fetch('https://legendary-garbanzo-x76ppvvv9q7hgv5-443.app.github.dev/auth/user/',
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
          console.log('Data:', data);
          window.location.href = '/user';
      } catch (error) {
          console.error('Failed to fetch user data', error);
      }};
      fetchData();
    }, []);
    

};

export default Intra;
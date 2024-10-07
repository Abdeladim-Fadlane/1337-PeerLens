import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const GitHubCallback = () => {
  const location = useLocation();
  useEffect(() => {
    const handleGitHubCallback = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');
      try {
        const res = await fetch('/api/github/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        localStorage.setItem('Data', JSON.stringify(data.user));
        localStorage.setItem('Type', JSON.stringify('github'));
        window.location.href = '/user';
      } catch (error) {
        console.error('Error:', error);
      }
    };
    handleGitHubCallback();
  }, [location.search]);
};


export default GitHubCallback;

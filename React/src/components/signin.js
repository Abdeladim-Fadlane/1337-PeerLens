import { useEffect } from "react";
import './Dashboard.css'; 


const Signin = () => {

    useEffect(() => {
        fetch('/api/data/')
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('Data', JSON.stringify(data));
                localStorage.setItem('Type', JSON.stringify('sing-in'));
                window.location.href = '/user';
                console.log(data);  
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
};

export default Signin;

import React, { useEffect, useState } from 'react';

// import './promo.css';
import brand from '../brand.svg';
const baseUrl = 'https://localhost/api/users/'
const Promo = ({status}) => {
  
  const [usersData, setusersData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [truck, setTruck] = useState(false);

  const handleClick = async (e) => {
    setusersData([]);
    setLoaded(false);
    const color = e.target.value;
    e.target.value = color;
    try {
      setTruck(true);
      await FetchUsers(color);
    
    } catch (error) {
      console.error('Failed to fetch users data', error);
    }
  }

  useEffect(() => {
    FetchUsers('orange');
    setTruck(true);
    setLoading(true);
  }, []);
  
  const FetchUsers = async (color) => {
    try {
      let usersList = [];
      let page = 1;
      let hasMoreData = true;
      let beginAt = '2022-10-05T06:00:00.000Z';
      
      if (color === 'black') {
        beginAt = '2023-10-30T08:37:00.000Z';
      }
      else if (color === 'white') {
        beginAt = '2024-07-22T08:37:00.000Z';
      }
      else if (color === 'green') {
        beginAt = '2021-08-02T08:37:00.000Z';
      }
      else if (color === 'blue') {
        beginAt = '2019-07-01T07:37:00.000Z';
      }

      while (hasMoreData) {
        const response = await fetch(`${baseUrl}?filter[campus_id]=21&filter[begin_at]=${beginAt}&page[size]=30&page[number]=${page}&sort=-level`);
        const data = await response.json();
        console.log(data);
        if (data.length === 0)
        {
          hasMoreData = false;
          setTruck(false);
        }
        else {
          setLoaded(true);
          usersList = usersList.concat(data);
          page += 1;
        }
        setusersData(usersList);
      }
    } catch (error) {
      
    }
  }
  if (status === false)
    return null;
  return (
<>
    {loading ? ( 
      <div className="flex flex-col items-center bg-gray-800 p-4">
        <div className="w-full max-w-xs">
          <select 
            id="colors" 
            value="Promo" 
            onChange={handleClick} 
            disabled={truck} 
            className="block w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-purple-500 transition duration-300"
          >
            <option value="promo">Promos</option>
            <option value="orange">Orange</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>
      </div>
    ) : ( 
      <div className="flex justify-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold text-white">1337 <strong>Leet</strong></h1>  
      </div>
    )}

  <div className="flex flex-col bg-cover bg-no-repeat justify-center items-center px-10 bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_0.jpg')]">
  <div className="overflow-y-scroll max-h-[100vh] w-full hide-scrollbar">
    {loaded ? ( usersData.length > 0 ?  (
        usersData.map((user, index) => (
          <div className="bg-opacity-30 flex  m-1 py-2 px-5 w-full  bg-gray-900 rounded-lg overflow-hidden shadow-sm transition-transform transform hover:scale-105 " key={user.id}>
            
            <a href={`https://profile.intra.42.fr/users/${user.user.login}`} target="_blank" className="">
              <img src={user.user.image.link} alt={user.user.displayname} className="w-20 m-4 items-center justify-center h-20 object-cover rounded-full" />
            </a>

            <div className="p-2 m-6 flex-1 items-center justify-center">
              <p className="text-sm font-semibold text-white">{user.user.displayname}</p>
              <p className="text-xs text-gray-400">{user.user.login}</p>
              <div className=" relative w-full bg-gray-700 rounded-md h-4 mt-1">
                <div 
                  className="bg-purple-600 h-4 rounded-md" 
                  style={{ width: `${(user.level % 1) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                  Level {Math.floor(user.level)} - {Math.round((user.level % 1) * 100)}%
                </span>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {index + 1}
            </div>
          </div>
          
        ))
      ) : (<></>)
    ) : (
      Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="h-32 flex bg-gray-800 p-8 my-2 rounded-lg shadow-sm animate-pulse w-full">
          <div className="w-20 h-20 bg-gray-700 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-3 w-20 bg-gray-600 rounded mb-1 my-2"></div>
            <div className="h-2 w-16 bg-gray-600 rounded mb-2"></div>
            <div className="h-5 bg-gray-700 rounded-full mb-4"></div>
          </div>
        </div>
      ))
    )}
    </div>
  </div>
  {/* Add this style block to your component */}
  <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer and Edge */
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
</>
  );
}

export default Promo;

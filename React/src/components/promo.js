import React, { useEffect, useState } from 'react';

import './promo.css';
import brand from '../brand.svg';
const baseUrl = 'https://localhost/api/users/'
const Promo = () => {
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
        const response = await fetch(`${baseUrl}?filter[campus_id]=21&filter[begin_at]=${beginAt}&page[size]=100&page[number]=${page}&sort=-level`);
        const data = await response.json();
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

  return (
    <>
      {loading ? ( 
          <div className="nav">
              <img src={brand} className='navImg' alt="brand" />
              <div className="promos">
                <select id="colors"  value="Promo" onChange={handleClick} disabled={truck}>
                  <option value="promo">Promo</option>
                  <option value="orange">Orange</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
          </div>
          ) :( 
              <div className="nav">
                  <h1 className='head'> 1337 <strong>Leet</strong></h1>  
              </div>
          )}

      <div className="users-container">
        {loaded ? (
          usersData.length > 0 ? 
          (
            usersData.map((user, index) => (
              <div className="card" key={user.id}>
                <a href={`https://profile.intra.42.fr/users/${user.user.login}`} className="image-link">
                  <img src={user.user.image.link} alt={user.user.displayname} />
                </a>
                <div className="card-content">
                  <p className="card-title">{user.user.displayname}</p>
                  <p className="login">{user.user.login}</p>
                  <p className="level">{user.level.toFixed(2)}</p>
                </div>
                <div className="card-index">
                  {index + 1}
                </div>
              </div>
            ))
          ) : (<></>)
        ) : (
          Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="skeleton">
              <div className="skeleton-img"></div>
              <div className="skeleton-text">
                <div className="skeleton-title"></div>
                <div className="skeleton-login"></div>
                <div className="skeleton-level"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Promo;

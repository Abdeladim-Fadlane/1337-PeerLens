import React, { useEffect } from 'react';
import Promo from './promo.js';
import Preloader from './Preloader.js';
import { useState } from 'react';
function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }
    , 2000);
    return () => clearTimeout(timer);
  }, []);
  
  
  if (loading) {
    return <Preloader />;
  }
  return (
    <div>
        <Promo />
    </div>
  );
}

export default Home;

import Login from './components/login';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Signin from './components/signin';
import User from './components/user';
import Gitgub from './components/github';
import Intra from './components/intra';
import Google from './components/google';

function App() {
  return (
      <Router >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/singup' element={<Login />} />
          <Route path='/signin' element={< Signin />} />
          <Route path='/user' element={< User />} />
          <Route path='/auth/github' element={< Gitgub />} />
          <Route path='/auth/intra' element={< Intra />} />
          <Route path='/auth/google' element={< Google />} />
        </Routes>
      </Router>
  );
}

export default App;

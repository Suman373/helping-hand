import React from 'react';
import './App.scss';
import {BrowserRouter as BRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/public/Home/Home';
import UserHome from './pages/user/UserHome/UserHome';

const App = () => {
  return (
    <>
    <BRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <Home/>
          }></Route>
          <Route path="/userhome" element={
            <UserHome/>
          }></Route>
        </Routes>
      </div>
    </BRouter>
    </>
  )
}

export default App;
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import {  Post, Create, Registration, Login, Error, Model, UserCard, Message, Chat } from './components/index';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Post/>}></Route>
        <Route path='/Registration' element={<Registration/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/inscrible' element={<Post/>}></Route>
        <Route path='/new-post' element={<Create/>}></Route>
        <Route path='/error' element={<Error/>}></Route>
        <Route path='/model' element={<Model/>}></Route>
        <Route path='/UserCard' element={<UserCard/>}></Route>
        <Route path='/Chat' element={<Chat/>}></Route>
        <Route path='/Message' element={<Message/>}></Route>
      </Routes>
    </>
  );
}

export default App;
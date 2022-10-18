import React from 'react';
import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddWorkout from './components/AddWorkout';
import EditWorkout from './components/EditWorkout';
import ViewWorkout from './components/ViewWorkout';
import LogInAndRegister from './components/LogInAndRegister';


function App() {
  const [loggedIn,setLoggedIn] = useState(false)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element= {<Home/>}  path ="/"/>    
          <Route element={<LogInAndRegister setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/register" />
          <Route element= {<Dashboard/>} path ="/dashboard" />  
          <Route element= {<AddWorkout/>} path ="/workout/add" />   
          <Route element= {<EditWorkout/>} path ="/workout/edit/:id" /> 
          <Route element= {<ViewWorkout/>} path ="/workout/view/:id" /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;

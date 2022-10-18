import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import WorkoutList from './components/Dashboard';
import AddWorkout from './components/AddWorkout';
import EditWorkout from './components/EditWorkout';
import ViewWorkout from './components/ViewWorkout';
import LogInAndRegister from './components/LogInAndRegister';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element= {<Home/>}  path ="/"/>   
          <Route element= {<LogInAndRegister/>} path ="/register"/> 
          <Route element= {<WorkoutList/>} path ="/dashboard" />  
          <Route element= {<AddWorkout/>} path ="/workout/add" />   
          <Route element= {<EditWorkout/>} path ="/workout/edit/:id" /> 
          <Route element= {<ViewWorkout/>} path ="/workout/view/:id" /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;

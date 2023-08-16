import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { Main} from './Pages/main/main';
import  {Login}  from './Pages/login';
import { Navbar } from './components/navbar';
import {Createpost} from './Pages/create-post/createpost';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/createpost" element={<Createpost/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

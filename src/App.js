import './App.css';
import React, { useState } from 'react'
import Navbar from './Component/Navbar';
import News  from './Component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
  import LoadingBar from 'react-top-loading-bar'

const App =()=>
{
  const pageSize= 16;
  
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("")


  const onSearchChange = (e) => {
    // console.log(e.target.value)
    setSearchQuery(e.target.value)
  }
  
 
    return (
      <div>
        <Router>
        <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange}/>

        <LoadingBar color='red' progress={progress} height={1}/>
       
        <Routes>
        
      <Route exact path="/" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="general" pageSize={pageSize} country="in" category="general"/>}/> 
      <Route exact path="/business" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="business" pageSize={pageSize} country="in" category="business"/>}/>
      <Route exact path="/entertainment" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
      <Route exact path="/health" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="health" pageSize={pageSize} country="in" category="health"/>}/>
      <Route exact path="/science" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="science" pageSize={pageSize} country="in" category="science"/>}/>
      <Route exact path="/sports" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
      <Route exact path="/technology" element={<News searchQuery={searchQuery} setProgress={setProgress}  key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
        </Routes>
        </Router>
      </div>
    )
  }

  export default App;


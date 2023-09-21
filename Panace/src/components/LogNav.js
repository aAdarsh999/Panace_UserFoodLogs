import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const LogNav = () => {
    const [data,setData] = useState([]);
    const func_data = async () =>{
        const res = await axios.get('http://127.0.0.1:5000/getData');
        setData(res.data)
        console.log(res.data)
    }
    useEffect(()=>{
        func_data()
    },[])
  return (
<nav className="navbar">
  <div className="navbar-brand">FoodJournal</div>
  <br></br>
  <br></br>
  
  <ul className="nav-list d-flex justify-content-between"> 
    <li className="nav-item ml-auto"><Link to='/'>Upload Logs</Link></li>
    <li className="nav-item ml-auto">{data[0].email}</li>
  </ul>
</nav>
  )
}

export default LogNav

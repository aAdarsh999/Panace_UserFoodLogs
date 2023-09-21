import React from "react";
import "./Navbar.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";

function Navbar() {
  return (
<nav className="navbar">
  <div className="navbar-brand">FoodJournal</div>
  <br></br>
  <br></br>
  
  <ul className="nav-list d-flex justify-content-between"> 
    <li className="nav-item ml-auto btn btn-warning"><Link to='getDetails' style={{color:'black',textDecoration:'None'}}>My Logs</Link></li>
    <li className="nav-item ml-auto mr-auto btn btn-primary"><Link to='login' style={{color:'white',textDecoration:'None'}}>Logout</Link></li>
  </ul>
</nav>

  );
}

export default Navbar;

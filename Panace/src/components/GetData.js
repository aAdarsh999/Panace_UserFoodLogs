import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import "./GetData.css"
import LogNav from './LogNav';
import { Link } from 'react-router-dom';
const GetData = () => {
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
        <div style={{ backgroundColor:'#D8BFD8',height:'100vh' }}>
            <center>
            <div className='row py-4 align-items'>
           <div className='col-7'><h1 >My Logs</h1></div>
           <div className='col-3'><h4>Username:{data[0]?.email}</h4></div>
           <div className='col-1 btn btn-primary'><Link to={'/'} style={{color:'white',textDecoration:'None'}}>Upload Logs</Link></div>
           </div>
            </center>

            
          <table className='p-5 w-75 m-auto text-center' style={{ backgroundColor:'#f6d7b0',border:'3px solid black',borderRadius:'20px'}} >
            <thead>
              <tr>
                <th>Foodname</th>
                <th>Meal</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Quantity</th>
                <th>Time</th>
                <th>Where</th>
                <th>Whom</th>
              </tr>
            </thead>
            <tbody>
              {data.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.foodname}</td>
                  <td>{doc.meal}</td>
                  <td>{doc.name}</td>
                  <td>
                    <img
                      src={doc?.photo}
                      alt="Food"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </td>
                  <td>{doc.quantity}</td>
                  <td>{doc.time}</td>
                  <td>{doc.where}</td>
                  <td>{doc.whom}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      );
    };

export default GetData

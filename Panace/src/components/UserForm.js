import React, { useState } from 'react';
import axios from 'axios'
import "./UserForm.css";
import Navbar from './Navbar';
const UserForm = () => {
  const [name, setName] = useState('')
  const [foodname, setfoodname] = useState('');
  const [quantity, setQuantity] = useState('');
  const [time, settime] = useState('');
  const [where, setwhere] = useState('');
  const [whom, setwhom] = useState('');
  const [meal, setmeal] = useState('');
  const [photo, setPhoto] = useState('')
  const [posts, setPosts] = useState([])

  const convert = (e) => {
    // console.log(e)
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result)
      setPhoto(reader.result)
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }

  const get_data = async () => {
    const res = await axios.get('http://localhost:5000/getData', { headers: { 'Access-Control-Allow-Origin': '*' } })
    setPosts(res.data)
  }
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  // useEffect(()=>{
  //   get_data()
  // })

  const handleClick = async () => {
    await axios.post('http://localhost:5000/submit', {
      name,
      foodname,
      quantity,
      time,
      where,
      whom,
      meal,
      photo
    })
    alert('data submitted')
    window.location.reload();
  }

  return (
    <div>
    <Navbar/>
<div className="container d-flex justify-content-center align-items-center vh-100">
<div className="card">
  <div className="card-body">
    <div className="row mb-3">
      <div className="col">
        <div>Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div>Food Name</div>
        <input type="text" value={foodname} onChange={(e) => setfoodname(e.target.value)} className="form-control" />
      </div>
      <div className="col">
        <div>Quantity</div>
        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <div>DateTime</div>
        <input type="datetime-local" value={time} onChange={(e) => settime(e.target.value)} className="form-control" />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <div>Where</div>
        <input type="text" value={where} onChange={(e) => setwhere(e.target.value)} className="form-control" />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <div>With Whom</div>
        <input type="text" value={whom} onChange={(e) => setwhom(e.target.value)} className="form-control" />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <div>Meal</div>
        <select name="meal" value={meal} onChange={(e) => setmeal(e.target.value)} className="form-control">
          <option value="">Select a meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <div>Photo</div>
        <input onChange={convert} type="file" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <button onClick={handleClick} className="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  );
};

// export default UserForm;


export default UserForm;


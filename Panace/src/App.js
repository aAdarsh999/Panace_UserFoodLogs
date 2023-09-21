import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from './components/UserForm'
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import GetData from './components/GetData';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserForm/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/getDetails' element={<GetData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

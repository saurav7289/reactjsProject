import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    'username':'',
    'password':'',
  });

  const handleSubmit = async (e)=>{
    e.preventDefault();
   
    setUser({
      'username':'',
      'password':'',
    })

// API CALL TO LOGIN

    const res = await axios.post('https://dummyjson.com/auth/login',user);
    if(res.status === 200) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('name', res.data.firstName);
      navigate('/');
      }
      
    } 
    
  return (
    <>
     


      <form className='col-md-6 m-auto'>
  <div className="mb-3 ">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"  name='username' value={user.username} placeholder='Enter username' onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}/>
   
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={user.password} placeholder='Enter password' onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}/>
  </div>
  <button type="submit" className="btn btn-success" onClick={handleSubmit}>Login</button>
</form>
    </>
  )
}

export default Login
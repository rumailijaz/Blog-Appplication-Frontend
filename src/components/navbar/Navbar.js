import React, {useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../App' 


const Navbar = () => {
 const {state , dispatch} = useContext(UserContext)
 console.log(state,"signin state")


 const navigate = useNavigate()

 const userAccess = () =>{
   if(state){
     return (
      [
        <li className={window.location.pathname=='/profile' && 'active'}><Link to="/profile">Profile</Link></li>,
        <li className={window.location.pathname=='/create' && 'active'}><Link to="/create">Create Post</Link></li>,
        <li> <button className="btn waves-effect waves-light #64b5f6 red darken-2"
        onClick={()=>{
          localStorage.clear()
          dispatch({type :"CLEAR"})
          navigate('/')
        }}
        >Logout</button></li>,
        
      ]
     )
   }
   else 
   {
     return (
       [
        <li className={window.location.pathname=='/signup' && 'active'}><Link to="/signup">Signup</Link></li>,
        <li className={window.location.pathname=='/' && 'active'}><Link to="/">Signin</Link></li>,

       ]
     )
   }
 }

  return (
    <nav>
    <div className="nav-wrapper white">
      <Link to={state? '/home' : '/'} className={window.location.pathname=='/home' || window.location.pathname=='/'? 'brand-logo left active':'brand-logo left'}>Instagram</Link>
      <ul id="nav-mobile" className="right">
       {userAccess()}
     
      </ul>
    </div>
  </nav>
  )
}

export default Navbar
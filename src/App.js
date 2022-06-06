import React ,{useContext , createContext, useReducer, useEffect} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter , Route, Routes, useNavigate} from 'react-router-dom'
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import CreatePost from './screens/CreatePost';
import { initialstate, reducer } from './reducer/usereducer';


export const UserContext =  createContext()

const Routing =()=>{

 const navigate = useNavigate()
 const {state , dispatch} = useContext(UserContext)

 useEffect(()=>{
  const user =JSON.parse(localStorage.getItem('user'))
  if(user){
    dispatch({type:"USER", payload :user})
    navigate('/home')
    // window.location("/")
  }
  else{
    navigate('/')
  }
},[])

  return (
    <>
      <Routes>
        <Route  path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route exact path='/' element={<Signin/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </>
  )
}


function App() {
 
  const [state , dispatch] = useReducer(reducer,initialstate)
  console.log(state,'app state');
  
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Routing/>
  
    </BrowserRouter>
    </UserContext.Provider>

  )
}

export default App;


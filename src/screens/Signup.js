import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate()
  
  const [formdata, setFormdata] = useState({
    name:'',
    email:'',
    password:'',

  })

  const {name, email , password} = formdata

  const regexemail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleChange =(e)=>{
      setFormdata({...formdata ,[e.target.name] : e.target.value})
  }

  const onSubmit=()=>{
  console.log(formdata);
  if(!regexemail.test(email)){
   return  toast.error('Invalid Email', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }


    fetch('/signup',{
      method:'POST',
      headers :{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,
        email,
        password
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.error)
      {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else {

          toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,

          });

          setTimeout(() => {
          navigate('/')
            
          }, 3000);

          setFormdata({
            name:'',
            email:'',
            password:'',
          })
    
      }
    
    });
  }
  
  return (
    <div>
            <ToastContainer />

      <div className="card hoverable auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder='Name' value={name} name='name' onChange={handleChange}  />
        <input type="email" placeholder='Email' value={email} name='email' onChange={handleChange} />
        <input type="password" placeholder='Password' value={password} name='password' onChange={handleChange} />

        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={onSubmit}
        >Signup</button>
        <h5>
           <Link to='/'> Already have an account ? </Link>
        </h5>
      
      </div>
    </div>
  )
}

export default Signup
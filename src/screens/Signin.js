import React,{useState ,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';

const Signin = () => {
  const navigate = useNavigate()

  const  { state , dispatch } =useContext(UserContext)
  console.log(state,"state")

  const [formdata, setFormdata] = useState({
    email:'',
    password:'',
  })

  const {email , password} = formdata

  const handleChange =(e)=>{
      setFormdata({...formdata ,[e.target.name] : e.target.value})
  }


  const onSubmit=()=>{
    console.log(formdata);
  
      fetch('/',{
        method:'POST',
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
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
        else{
          localStorage.setItem('token',data.token)
          localStorage.setItem('user',JSON.stringify(data.user))
          dispatch({type:"USER", payload:data.user})
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
              navigate('/home')
                
              }, 3000);
        }
       
      });
    }

  return (
    <div>
            <ToastContainer />

      <div className="card hoverable auth-card input-field">
        <h2>Instagram</h2>
        <input type="email" placeholder='Email' value={email} name='email'  onChange={handleChange} />
        <input type="password" placeholder='Password' value={password} name='password'  onChange={handleChange} />


        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={onSubmit}
       >Signin</button>
        <h5>
           <Link to='/signup'> Don't have an account ? </Link>
        </h5>
      </div>
    </div>
  )
}

export default Signin
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
  const [formdata, setFormdata] = useState({
    title:'',
    body:'',

  })

  const navigate = useNavigate()

  const {title, body  } = formdata

  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')


  const handleChange =(e)=>{
    setFormdata({...formdata ,[e.target.name] : e.target.value})
}
useEffect(()=>{
  if(url)
  {
    fetch('/createpost',{
      method : 'POST',
      headers :{
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+localStorage.getItem('token')
      },
      body : JSON.stringify({
        title,
        body,
        pic :url
      })
    }).then(res=>res.json()).then(data => {
      if(data.error){
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
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

          setTimeout(()=>{
            navigate('/home')
          },3000)
      }
      console.log(data,'api')
    })
  }

},[url])


  const postdata=()=>{

    const formData =  new FormData()

    formData.append('file',image)

    formData.append('upload_preset', "rum-boss") 
    formData.append("cloud_name",'rum')

    fetch("https://api.cloudinary.com/v1_1/rum/image/upload",{
      method:'post',
      body : formData

    })
    .then(res => res.json()).then(data => {
      console.log(data,"data")
      if(data.error){
        toast.error('select image ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      setUrl(data.url)

    })
    .catch(err => {
      console.log(err)
    })

    // console.log(formdata,url);

    // setFormdata({
    //   title:'',
    //   body:'',
    // })

   

  setImage('')
  }
  return (

    <div className='card create-div input-field'>
        <input type='text' placeholder='title' name='title' value={title} onChange={handleChange}/>
        <input type='text' placeholder='body' name='body' value={body} onChange={handleChange}/>

        <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>upload image</span>
                <input type="file"
                onChange={(e)=>setImage(e.target.files[0])}
                 />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
        </div>

        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={()=>{postdata()}}>Submit post</button>
    <ToastContainer />

    </div>
  )
}

export default CreatePost
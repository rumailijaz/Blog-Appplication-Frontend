import React, { createContext,useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [data,setData] = useState([])



  useEffect(()=>{
    getAllPost()
    

      },[])
  const getAllPost = () => {
    fetch('/allposts',{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem('token')
      }
    }).then(res=>res.json()).then(result=>setData(result.posts));
  
  }



  const {state , dispatch} = useContext(UserContext)

  // console.log(state, 'homeeeeeeee');
  console.log(data,   'aray');

  const likePost =(id)=>{
    fetch('/like',{
      method:'put',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : "Bearer "+localStorage.getItem('token')
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json()).then(result=>{
      const newdata=data.map((item)=>{
        if(item._id==result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newdata)
    }).catch(err=>{
      console.log(err);
    })
  }

  const unlikePost =(id)=>{
    fetch('/unlike',{
      method:'put',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : "Bearer "+localStorage.getItem('token')
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json()).then(result=>{
      const newdata=data.map((item)=>{
        if(item._id==result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newdata)
    }).catch(err=>{
      console.log(err);
    })
  }

  console.log(window.location)

  const makeComment =(msg, id)=>{
    fetch('/comment',{
      method:'put',
      headers:{
        'Content-Type':'application/json',
        'Authorization' : "Bearer "+localStorage.getItem('token')
      },
      body:JSON.stringify({
        postId:id,
        text:msg
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result,'hshsh');
      const newdata=data.map((item)=>{
        if(item._id==result._id){
          return result
        }
        else{
          return item
        }
      })
      console.log(newdata,'new');

      setData(newdata) 
    }).catch(err=>{
      console.log(err);
    })
  }

  const deletPost=(postid)=>{
    fetch(`/deletepost/${postid}`,{
      method:'delete',
      headers:{
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      if(result.message){
        toast.success(result.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          getAllPost()
        const newdata=data.filter((item)=>{
          return item._id!==result._id 
        }) 
        getAllPost()
        setData(newdata)
      }
    })
  }

  return (
    <div className='home'>
            <ToastContainer />

      {data.map((item)=>{
        return (
          <div className='card home-card' key={item._id}>
            <h5>{item.postedBy.name}
            {item.postedBy._id==state.id && 
            <i className="material-icons" onClick={()=>{deletPost(item._id)}}  style={{float:'right',cursor:'pointer',color:'red'}}>delete</i>} </h5>
           
            <div className='card-image'>
              <img src={item.photo}/>
            </div>
            <div className='card-content'>
            <i className="material-icons" style={{color:'red'}}>favorite</i>
            {
              item.likes.includes(state.id)?
              <i className="material-icons"  style={{cursor:'pointer'}} onClick={()=>{unlikePost(item._id)}}>thumb_down</i>:
              <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>{likePost(item._id)}}>thumb_up</i> 
            }
            
            <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record)=>{
                return (
                  <h6 key={record._id}><span style={{fontWeight:'600'}}>{record.postedBy.name}</span> {record.text}</h6>
                )
              })}

              <form onSubmit={(e)=>{
                e.preventDefault()
                makeComment(e.target[0].value,item._id)
              }}>
              <input type="text" placeholder='add a comment'/>

              </form>
            </div>
          </div>
        )
      })}

    
    </div>
  )
}

export default Home
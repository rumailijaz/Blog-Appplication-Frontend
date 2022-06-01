 export const initialstate= null 

 export const  reducer = (state,action)=>{
     console.log(state,action);

    if(action.type === "USER")
    {
        return action.payload;

    }
    if(action.type === 'CLEAR')
    {
        return null

    }

    return  state 
    

  }
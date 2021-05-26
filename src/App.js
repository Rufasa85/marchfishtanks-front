import React, {useEffect,useState} from "react";
import './App.css';
import API from "./utils/API";

function App() {
  const [formState,setFormState] = useState({
    email:"",
    password:""
  })

  const [userState,setUserState] = useState({
    token:"",
    user:{

    }
  })

  useEffect(()=>{
    const token = localStorage.getItem("token")
    API.getProfile(token).then(res=>{
      console.log(res.data);
    })
  },[])

  const handleFormSubmit = e =>{
    e.preventDefault();
    API.login(formState).then(res=>{
      console.log(res.data);
      localStorage.setItem("token",res.data.token)
      setUserState({
        ...userState,
        token:res.data.token,
        user:{
          email:res.data.user.email,
          name:res.data.user.name,
        }
      })
    }).catch(err=>{
      console.log("error occured")
      console.log(err);
    })
    setFormState({
      email:"",
      password:""
    })
  }
  return (
    <div>
      <h1>welcome!</h1>
      <form onSubmit = {handleFormSubmit}> 
        <input name="email" value = {formState.email} onChange={(e)=>setFormState({...formState,email:e.target.value})}/>
        <input name="password"  type="password" value = {formState.password} onChange={(e)=>setFormState({...formState,password:e.target.value})}/>
        <input type="submit" value="login"/>
      </form>
    </div>
  );
}

export default App;

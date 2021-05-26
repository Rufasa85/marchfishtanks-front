import React, {useEffect,useState} from "react";
import './App.css';
import API from "./utils/API";

function App() {
  const [formState,setFormState] = useState({
    email:"",
    password:""
  })
  const [signupFormState,setSignupFormState] = useState({
    email:"",
    password:"",
    name:""
  })

  const [userState,setUserState] = useState({
    token:"",
    user:{

    }
  })

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      API.getProfile(token).then(res=>{
        console.log(res.data);
        setUserState({
          token:token,
          user:{
            email:res.data.email,
            id:res.data.id,
            name:res.data.name
          }
        })
      }).catch(err=>{
        console.log("no logged in user")
        setUserState({
          token:"",
          user:{}
        })
      })
    } else {
      console.log("no token provided")
    }
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
      localStorage.removeItem("token");
      setUserState({
        token:"",
        user:{}
      })
    })
    setFormState({
      email:"",
      password:""
    })
  }

  const handleSignupFormSubmit = e=>{
    e.preventDefault();
    console.log(signupFormState);
    API.signup(signupFormState).then(res=>{
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
      localStorage.removeItem("token");
      setUserState({
        token:"",
        user:{}
      })
    })
    setSignupFormState({
      name:"",
      email:"",
      password:""
    })
  }

  const handleLogout = ()=>{
    setUserState({
      token:"",
      user:{}
    })
    localStorage.removeItem("token")
  }
  return (
    <div>
      <h1>welcome!</h1>
      {!userState.user?.name ? (<div>
        <form onSubmit = {handleFormSubmit}> 
        <input name="email" value = {formState.email} onChange={(e)=>setFormState({...formState,email:e.target.value})}/>
        <input name="password"  type="password" value = {formState.password} onChange={(e)=>setFormState({...formState,password:e.target.value})}/>
        <input type="submit" value="login"/>
      </form>
      <form onSubmit = {handleSignupFormSubmit}> 
        <input name="email" value = {signupFormState.email} onChange={(e)=>setSignupFormState({...signupFormState,email:e.target.value})}/>
        <input name="name" value = {signupFormState.name} onChange={(e)=>setSignupFormState({...signupFormState,name:e.target.value})}/>
        <input name="password"  type="password" value = {signupFormState.password} onChange={(e)=>setSignupFormState({...signupFormState,password:e.target.value})}/>
        <input type="submit" value="signup"/>
      </form>
      </div>):(
        <div>
      <h1>Welcome back, {userState.user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
      </div>
      )}
    </div>
  );
}

export default App;

import React, {useEffect,useState} from "react";
import './App.css';
import API from "./utils/API";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SingleTank from "./pages/SingleTank";

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
          id:res.data.user.id
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
          id:res.data.user.id
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
      <Router>
        <NavBar user={userState.user} 
        handleFormSubmit={handleFormSubmit} 
        formState={formState} 
        setFormState={setFormState} 
        signupFormState={signupFormState} 
        setSignupFormState={setSignupFormState}
        handleSignupFormSubmit={handleSignupFormSubmit}
        handleLogout={handleLogout}
        />
        <Switch>
          <Route exact path ="/">
            <Home user={userState.user} token={userState.token}/>
          </Route>
          <Route exact path ="/tanks/:id">
            <SingleTank token={userState.token}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

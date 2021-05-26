import React,{useEffect,useState} from 'react'
import API from "../../utils/API"
import TankThumbnail from "../../components/TankThumbnail";
import {Link} from  "react-router-dom"

export default function Home(props) {

  const [tankState,setTankState] = useState([]);
  const [newTankState,setNewTankState] = useState("")
  useEffect(() => {
    API.getAllTanks().then(res=>{
        setTankState(res.data);
      })
     
  }, [])

  const handleFormSubmit = e=>{
    e.preventDefault();
    const body = {
      name:newTankState,
      UserId:props.user.id
    };
    API.createTank(body,props.token).then(res=>{
      API.getAllTanks().then(res=>{
        setTankState(res.data);
      })
    })
  }

    return (
      <div>
      <h2>All Tanks</h2>
      <div className="flex">
      {props.user?.id ? (
      <form onSubmit={handleFormSubmit}>
        <input name="tank" value={newTankState} onChange={e=>setNewTankState(e.target.value)}/>
        <button>Add Tank</button>
        </form>
      ):null}
      {tankState.map(tank=><Link key={tank.id} to={`/tanks/${tank.id}`}><TankThumbnail fish={tank.Fishes} name={tank.name}/></Link>)}
      </div>
    </div>
    )
}

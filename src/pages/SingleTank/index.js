import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom";
import API from '../../utils/API';
import Fish from "../../components/Fish"
import "./style.css"

export default function SingleTank() {
const {id}=  useParams();
const [tankState,setTankState] = useState({
    name:"",
    fish:[]
})

useEffect(() => {
    API.getOneTank(id).then(res=>{
        console.log(res.data);
        setTankState({
            name:res.data.name,
            fish:res.data.Fishes
        })
    })
   
}, [])
    return (
        <div>
        <h1>Tanks name: {tankState.name}</h1>
        <div className="TankDetail">
            {tankState.fish.map(fishy => <Fish key={fishy.id} name={fishy.name} color={fishy.color} width={fishy.width} />)}
        </div>

        <div className="seaFloor"></div>
        </div>
    )
}

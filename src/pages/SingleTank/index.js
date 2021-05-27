import React,{useEffect,useState} from 'react'
import {useParams,useHistory} from "react-router-dom";
import API from '../../utils/API';
import Fish from "../../components/Fish"
import "./style.css"
import AddFish from '../../components/AddFish';
import EditFish from '../../components/EditFish';


export default function SingleTank(props) {
const {id}=  useParams();
const history = useHistory();
const [tankState,setTankState] = useState({
    name:"",
    fish:[],
    canEdit:false
})
const [newTankName,setNewTankName] = useState("")
const [myTanksState,setMyTanks] = useState([])

useEffect(() => {
    fetchData()
}, [props.token])

const fetchData= ()=>{
    API.getOneTank(id,props.token).then(res=>{
        console.log(res.data);
        setTankState({
            name:res.data.tank.name,
            fish:res.data.tank.Fishes,
            canEdit:res.data.canEdit
        })
        setNewTankName(res.data.tank.name)
    })
    API.getMyTanks(props.token).then(res=>{
        setMyTanks(res.data.Tanks)
    })
}

const renameTank = e=>{
    e.preventDefault();
    API.editTank({name:newTankName},id,props.token).then(res=>{
        fetchData();
    })
}
    return (
        <div>
        <h1>Tanks name: {tankState.name}</h1>
        {tankState.canEdit&& (
            <form onSubmit={renameTank}>
                <input value={newTankName} onChange={(e)=>setNewTankName(e.target.value)}/>
                <button>Change name!</button>
            </form>
        )}
        {tankState.canEdit &&<AddFish fetchData={fetchData} token={props.token} tankId={id}/>}
        {tankState.canEdit&& tankState.fish.length>0&&<EditFish fish={tankState.fish} token={props.token} tanks={myTanksState} fetchData={fetchData}/>}
        <div className="TankDetail">
            {tankState.fish.map(fishy => <>
            <Fish key={fishy.id} name={fishy.name} color={fishy.color} width={fishy.width} />
            {tankState.canEdit && <button onClick={()=>API.deleteFish(fishy.id,props.token).then(data=>fetchData())}>Delete</button>}
            </>)}
        </div>

        <div className="seaFloor"></div>
        {tankState.canEdit&& <button onClick={()=>API.deleteTank(id,props.token).then(res=>history.push("/"))}>Delete</button>}
        
        </div>

    )
}

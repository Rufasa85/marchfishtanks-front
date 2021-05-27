import React,{useState} from 'react'
import Fish from '../Fish';
import API from '../../utils/API';

export default function EditFish(props) {
    const [formState,setFormState] = useState({
        name:props.fish[0].name,
        color:props.fish[0].color,
        width:props.fish[0].width,
        currentFishId:props.fish[0].id,
        tankId:props.fish[0].TankId
    })
    const fishChange=e=>{
        const newFishId=parseInt(e.target.value);
        let newFish;
        props.fish.forEach(fishy=>{
            // console.log(fishy,newFishId)
            if(newFishId===fishy.id){
               newFish=fishy
            }
        })
        setFormState({
            ...formState,
            name:newFish.name,
            color:newFish.color,
            width:newFish.width,
            currentFishId:newFish.id
        })
    }
    const handleFormSubmit= e =>{
        e.preventDefault();
        API.editFish(formState,formState.currentFishId,props.token).then(res=>{
            props.fetchData();
        })
    }
    return (
        <>
        <Fish name={formState.name} color={formState.color} width={formState.width}/>
        <form onSubmit={handleFormSubmit}>
            <select value={formState.currentFishId} onChange={fishChange}>
                {props.fish.map(fishy=><option key={fishy.id} value={fishy.id}>{fishy.name}</option>)}
            </select>
            <select value={formState.tankId} onChange={e=>setFormState({...formState,tankId:e.target.value})}>
                {props.tanks.map(tank=><option key={tank.id} value={tank.id}>{tank.name}</option>)}
            </select>
            <input value={formState.name} onChange={e=>setFormState({...formState,name:e.target.value})}/>
            <input type="color" value={formState.color} onChange={e=>setFormState({...formState,color:e.target.value})}/>
            <input type="number" value={formState.width} onChange={e=>setFormState({...formState,width:e.target.value})}/>
            <button>Edit Fish</button>
        </form>
        </>
    )
}

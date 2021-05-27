import React,{useState} from 'react'
import Fish from '../Fish';
import API from '../../utils/API';

export default function AddFish(props) {
    const [formState,setFormState]= useState({
        name:"",
        color:"#eabcde",
        width:100,
        tankId:props.tankId
    })
    const formSubmit = e=>{
        e.preventDefault();
        API.createFish(formState,props.token).then(res=>{
            console.log(res.data);
            props.fetchData()
            setFormState({
                name:"",
                color:"#eabcde",
                width:100,
                tankId:props.tankId
            })
        })

    }
    return (
        <div>
            <form onSubmit={formSubmit}>
                <input value={formState.name} onChange={(e)=>setFormState({...formState,name:e.target.value})}/>
                <input value={formState.color} type="color" onChange={(e)=>setFormState({...formState,color:e.target.value})}/>
                <input value={formState.width} type="number" onChange={(e)=>setFormState({...formState,width:e.target.value})}/>
                <button>Add Fish</button>
            </form>
            <Fish name={formState.name} color={formState.color} width={formState.width}/>
        </div>
    )
}

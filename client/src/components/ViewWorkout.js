import axios from 'axios'
import React, { useEffect,useState } from 'react'
import {useParams,useNavigate } from 'react-router-dom'

const ItemView = () => {

    const navigate = useNavigate()
    const [item,setItem] = useState("")
    const {id} = useParams() 


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/v1/workouts/${id}`)
        .then((res) =>{
            console.log(res.data.item)  
            setItem(res.data.item)
        })
        .catch((err) =>{
            console.log(err)   
        })
    },)
    
    

return (
    <div>
        <div >
            <button onClick={()=>navigate(`/dashboard`)} >Dashboard</button>
            <button onClick={()=>navigate(`/logout`)} >Log Out</button>
        </div>
        <div >
            <p>Name: {item.name}</p>
            <p>Goal Type: {item.type}</p>
            <p>Sets: {item.sets}</p>
            <p>Reps: {item.reps}</p>
            <p>Description: {item.description}</p>
            <p>Instruction: {item.instruction}</p>
        </div>
    </div>
)
}

export default ItemView
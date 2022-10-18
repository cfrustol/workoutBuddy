import React from 'react';
import { useState,useEffect  } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';

const EditWorkout = () => {

    const {id} = useParams()
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [description, setDescription] = useState("")
    const [instruction, setInstruction] = useState("")
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()


    const Goaltypes = [
        'Balance',
        'Flexibility',
        'Strength',
        'Endurance',
    ]

    const handleGoal = (e)=>{

        setErrors("")
        setGoal(e.target.value)
    }

    const handleSets = (e)=>{
        setErrors("")
        setSets(e.target.value)
    }
    const handleReps = (e)=>{

        setErrors("")
        setReps (e.target.value)
    }
    const handleDifficulty = (e)=>{

        setErrors("")
        setDifficulty(e.target.value)
    }

    const handleDescription = (e)=>{

        setErrors("")
        setDescription(e.target.value)
    }
    const handleInstruction = (e)=>{

        setErrors("")
        setInstruction(e.target.value)
    }

    useEffect((id)=>{
        axios.get(`http://localhost:8000/api/v1/workouts/${id}`)
        .then((res) =>{
            console.log(res.data.item)  
            setName(res.data.item[0].name) 
            setGoal(res.data.item[0].goal) 
            setSets(res.data.item[0].sets) 
            setReps(res.data.item[0].reps) 
            setDifficulty(res.data.item[0].difficulty)  
            setDescription(res.data.item[0].description)  
            setInstruction(res.data.item[0].instruction)  
        })
        .catch((err) =>{
            console.log(err)   
        })
    },[])


    const SubmitWorkout = (e) => {
        e.preventDefault()
        const workout={name,
                goal,
                sets,
                reps,
                difficulty,
                description,
                instruction,
                }
            axios.put(`http://localhost:8000/api/v1/workouts/${id}`,workout)
            .then((workout)=>{
                console.log(workout)
                navigate("/dashboard")
            })
            .catch((err)=>{
                console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            },[])
        }
        
        
    

        return (
        <div>
            <div >
                <button onClick={()=>navigate(`/dashboard`)} >Dashboard</button>
                <button onClick={()=>navigate(`/logout`)} >Log Out</button>
            </div>
        <div>
            <div>
            <h1>Workout Name: {name}</h1>
                <form onSubmit={ SubmitWorkout } className='MainSell'>
                {errors.type ? <p style={{color:"red"}}>{errors.type.message}</p>:null}
                <div> {/*Type*/}
                    <label>Type: </label> 
                    <select name="items" id="items" onChange={ handleGoal}>
                    <option value={goal} ></option>
                        {
                            Goaltypes.map((item,idx)=>(
                                <option key = {idx} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                {errors.sku ? <p style={{color:"red"}}>{errors.sku.message}</p>:null}
                <div> 
                    <label>Sets: </label> 
                    <input type="number" onChange={ handleSets } value={sets}/>
                </div>
                <div> 
                    <label>Reps: </label> 
                    <input type="number" onChange={ handleReps } value={reps}/>
                </div>
                {errors.price ? <p style={{color:"red"}}>{errors.price.message}</p>:null}
                <div onChange={ handleDifficulty }> 
                    <label>Difficulty: </label> 
                    <input type="radio"  name="difficulty"   value="Beginner"/>
                    <label>Begginer</label> 
                    <input type="radio"  name="difficulty"   value="Intermediate"/>
                    <label>Intermediate</label> 
                    <input type="radio"  name="difficulty"  value="Advance"/>
                    <label>Advance</label> 
                </div>
                <div> 
                    <label>Description: </label> 
                    <input type="text" onChange={ handleDescription }  value={description}/>
                </div>
                <div> 
                    <label>Instruction: </label> 
                    <input type="text" onChange={ handleInstruction }  value={instruction}/>
                </div>
                
                <input type="submit" value="Add Item" />
                </form>
            </div>
            </div>
        </div>
    )
    }

export default EditWorkout
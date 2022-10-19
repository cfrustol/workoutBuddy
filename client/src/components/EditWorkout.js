import React from 'react';
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';


const EditWorkout = () => {
    const {state, dispatch} = useContext(UserContext)
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
    const difficult = [
        'beginner',
        'intermediate',
        'advanced',
    ]

    const handleName = (e)=>{

        setErrors("")
        setName(e.target.value)
    }

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

    useEffect((_id)=>{
        axios.get(`http://localhost:8000/api/workouts/${id}`)
        .then((res) =>{
            console.log(res.data.goal)  
            setName(res.data.name) 
            setGoal(res.data.goal) 
            setSets(res.data.sets) 
            setReps(res.data.reps) 
            setDifficulty(res.data.difficulty)  
            setDescription(res.data.description)  
            setInstruction(res.data.instruction)  
        })
        .catch((err) =>{
            console.log(err)   
        })
    },[id])


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
            axios.put(`http://localhost:8000/api/workouts/edit/${id}`,workout)
            .then((workout)=>{
                console.log(workout)
                navigate("/dashboard")
            })
            .catch((err)=>{
                console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            },[])
        }
        
    const handleLogout = ()=>{
      console.log("logged out")
      dispatch({
        type:"LOGOUT_USER",
        payload:navigate
      })
    }
    

        return (
        <div>
            <div >
                <button onClick={()=>navigate(`/dashboard`)} >Dashboard</button>
                <button onClick={handleLogout} >Log Out</button>
            </div>
        <div>
            <div>
            <h1>Workout Name: {name}</h1>
                <form onSubmit={ SubmitWorkout } className=''>
                <div>
                    <label htmlFor="">Exercise Name</label>
                    <input type="text" onChange={ handleName } value={name}/>
                </div>
                {errors.type ? <p style={{color:"red"}}>{errors.type.message}</p>:null}
                <div> {/*Type*/}
                    <label>Type: </label> 
                    <select name="items" id="items" onChange={ handleGoal} value={goal} >
                    <option></option>
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
                    <select name="" id="" onChange={ handleDifficulty} value={difficulty} >
                    <option></option>
                        {
                            difficult.map((item,idx)=>(
                                <option key = {idx} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                <div> 
                    <label>Description: </label> 
                    <input type="text" onChange={ handleDescription }  value={description}/>
                </div>
                <div> 
                    <label>Instruction: </label> 
                    <input type="text" onChange={ handleInstruction }  value={instruction}/>
                </div>
                
                <input type="submit" value="Finish Edit" />
                </form>
            </div>
            </div>
        </div>
    )
    }

export default EditWorkout
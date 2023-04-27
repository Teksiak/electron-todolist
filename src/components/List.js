import React, { useState } from "react";
import Task from "./Task";

export default function List() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")

    const addTask = () => {
        const newTask = {
            id: tasks.length != 0 ? tasks[tasks.length-1].id+1 : 1,
            title: title,
            description: description
        }
        if(title == "") {
            setMessage("Title cannot be empty!")
        }
        else {
            setTasks(prev => {
                return [...prev, newTask]
            })
            setTitle("")
            setDescription("")
            setMessage("")
        }
    }

    const deleteTask = (taskId) => {
        setTasks(prev => {
            return prev.filter(el => el.id != taskId)
        })
    }

    return (
        <div className="text-center">
            <div className="d-flex justify-content-center gap-4 m-3">
                <input type="text" className="custom-input px-2" placeholder="Title" value={title} onChange={(event) => {setTitle(event.target.value)}}></input>
                <input type="text" className="custom-input px-2" placeholder="Description" value={description} onChange={(event) => {setDescription(event.target.value)}}></input>
            </div>
            <small className="text-muted">{message}</small> <br/>
            <button className="btn btn-outline-secondary mt-1" onClick={addTask}>Add Task</button>
            <div>
                {
                    tasks.map((el, n) => {
                        return <Task number={n+1} title={el.title} description={el.description} deleteTask={() => deleteTask(el.id)}/>
                    })
                }
            </div>
        </div>
    )
}

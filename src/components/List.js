import React, { useEffect, useState, useReducer } from "react";
import Task from "./Task";
import Timer from "./Timer";
import { channels } from '../shared/constants';

const { ipcRenderer } = window.require('electron');

export default function List() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [message, setMessage] = useState("")

    const addTask = () => {
        if(title == "" || date == "") {
             ipcRenderer.send(channels.SHOW_DIALOG, {
                type: 'error',
                title: 'Invalid data',
                message: 'Title and date must be filled!'
             })
            // setMessage('Wrong data!')
            return
        }

        const newTask = {
            id: tasks.length != 0 ? tasks[tasks.length-1].id+1 : 1,
            title: title,
            description: description,
            date: date,
            finished: false,
            reminder: setTimeout(() => {
                ipcRenderer.send(channels.SHOW_NOTIFICATION, {
                    title,
                    body: "Task reminder"
                });
            }, Date.parse(date) - Date.now())
        }

        setTasks(prev => {
            return [...prev, newTask]
        })
        setTitle("")
        setDescription("")
        setDate("")
        setMessage("")
    }

    const deleteTask = (taskId) => {
        setTasks(prev => {
            return prev.filter(el => el.id != taskId)
        })
    }

    useEffect(() => {
        console.log(1)
    }, [tasks])

    return (
        <div className="text-center">
            <Timer setTasks={setTasks}/>
            <div className="horizontal-line"></div>
            <div className="d-flex justify-content-center gap-4 m-3">
                <input type="text" className="custom-input px-2" placeholder="Title" value={title} onChange={(event) => {setTitle(event.target.value)}}></input>
                <input type="text" className="custom-input px-2" placeholder="Description" value={description} onChange={(event) => {setDescription(event.target.value)}}></input>
                <input type="datetime-local" className="custom-input px-2" value={date} onChange={(event) => {setDate(event.target.value)}}></input>
            </div>
            <small className="text-muted">{message}</small> <br/>
            <button className="btn btn-outline-secondary mt-1" onClick={addTask}>Add Task</button>
            <div className="d-flex flex-column align-items-center">
                {
                    tasks.map((el, n) => {
                        return <Task key={el.id} number={n+1} title={el.title} description={el.description} date={el.date} deleteTask={() => deleteTask(el.id)}/>
                    })
                }
            </div>
        </div>
    )
}

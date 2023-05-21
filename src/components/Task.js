import React, { useEffect, useState } from "react";

export default function Task({ number, title, description, deleteTask, date, finished }) {
    const [edit, setEdit] = useState(false)
    const [editTitle, setTitle] = useState(title)
    const [editDescription, setDescription] = useState(description)

    return (
        <div style={{position: 'relative'}}>
            <div className="d-flex align-items-center px-5 mx-5">
                <h3 className={"display-1 fw-bold font-30 " + (finished ? "text-muted": "text-light")}>
                    {
                        finished ? 
                        <del>{number}</del> : 
                        number
                    }
                </h3>
                <div className="vertical-line mx-3"></div>
                <div className="p-2 ps-0 d-flex flex-column align-items-start" style={{width: "200px"}}>
                    {
                        edit ?
                        <input className="custom-input" value={editTitle} onChange={(event) => {setTitle(event.target.value)}} placeholder="Title"></input>
                        : <h3 className="text-light m-0">{editTitle}</h3>
                    }
                    {
                        edit ?
                        <input className="custom-input" value={editDescription} onChange={(event) => {setDescription(event.target.value)}} placeholder="Description"></input>
                        : <small className="text-muted">{editDescription} | {date}</small>
                    }
                </div>
                <button className="btn btn-sm btn-outline-light ms-5" onClick={() => {setEdit(prev => !prev)}}>
                    {
                        edit ? "Save" : "Edit"
                    }
                </button>
                <div
                    className="text-light mx-3 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={deleteTask}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

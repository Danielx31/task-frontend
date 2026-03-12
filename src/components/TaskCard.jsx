import React from "react"

function TaskCard({ task }) {
    return (
        <div style={{
            border: "1px solid $ccc", 
            padding: "10px", 
            marginBottom: "10px", 
            borderRadius: "8px"
        }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Status: {task.status}</small>
        </div>
        
        
    )
}

export default React.memo(TaskCard)
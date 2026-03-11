import { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await fetchTasks()

                setTasks(response.data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadTasks()
    }, [])

    if (loading) return <p>Loading tasks...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Task</h1>

            {tasks.map(task => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    )
}
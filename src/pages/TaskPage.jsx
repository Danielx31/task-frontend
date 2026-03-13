import { useEffect, useMemo, useState } from "react";
import { fetchTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all')
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function loadTasks(pageNumber = 1) {
        setLoading(true)

        try {
            const data = await fetchTasks(pageNumber)

            setTasks(data.data.data)
            setPage(data.data.current_page)
            setLastPage(data.data.last_page)

        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const filteredTasks = useMemo(() => {
        if (filter === "all") return tasks

        return tasks.filter(task => task.status === filter)
    }, [tasks, filter])

    useEffect(() => {
        loadTasks(page)
    }, [page])

    if (loading) return <p>Loading tasks...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Task</h1>

            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}

            <div style={{ marginTop: "20px" }}>

                <button 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page} of {lastPage}
                </span>

                <button 
                    disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>
        </div>
        

        
    )
}
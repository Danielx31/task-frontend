const API_URL = "http://127.0.0.1:8000/api/v1/tasks";

export async function fetchTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

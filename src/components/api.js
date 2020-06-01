import axios from "axios"


const api = {
    createTodolist(title) {
        return axios.post(
            "https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title},
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
    },
    getTodoList() {
        return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {withCredentials: true})
    },
    getTask(id){
        return axios.get( `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            })
    },
    addTask(newTitle, todoListId) {
        return axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
    },
    ChangeTask(task) {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            task,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
    },
    deleteToDoList(id) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
    },
    deleteTask(taskId,id) {
        return  axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
    }
}
export default api

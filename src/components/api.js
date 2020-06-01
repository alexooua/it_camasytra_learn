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
    addTask(newTitle,todoListId){
        return axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
    }
}
export default api

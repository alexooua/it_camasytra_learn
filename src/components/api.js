import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}

});

const api = {
    onchangeTodoListTitle(title,id) {
        return instance.put(
            `/${id}`,
            {title: title}
        )
    },
    createTodolist(title) {
        return instance.post(
            "",
            {title: title},
        )
    },
    getTodoList() {
        return instance.get("")
    },
    getTask(id) {
        return instance.get(`/${id}/tasks`,
        )
    },
    addTask(newTitle, todoListId) {
        return instance.post(
            `/${todoListId}/tasks`,
            {title: newTitle},
        )
    },
    ChangeTask(task) {
        return instance.put(
            `/${task.todoListId}/tasks/${task.id}`,
            task,
        )
    },
    deleteToDoList(id) {
        return instance.delete(
            `/${id}`,
        )
    },
    deleteTask(taskId,id) {
        return instance.delete(
            `/${id}/tasks/${taskId}`,
        )
    }
}
export default api

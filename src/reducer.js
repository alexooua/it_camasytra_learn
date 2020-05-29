export const ADD_TO_DO_LIST = 'todolist/reducer/ADD_TO_DO_LIST'
export const ADD_TASK = 'todolist/reducer/ADD_TASK'
export const CHANGE_TASK = 'todolist/reducer/CHANGE_TASK'
export const DELETE_TO_DO_LIST = 'todolist/reducer/DELETE_TO_DO_LIST'
export const DELETE_TASK = 'todolist/reducer/DELETE_TASK'
export const SET_TODOLISTS = 'todolist/reducer/SET_TODOLISTS'
export const SET_TASKS = 'todolist/reducer/SET_TASKS'
export const UPDATE_TASK = 'todolist/reducer/UPDATE_TASK'


const initialState = {
    toDoLists: []
}
export const reducer = (state = initialState, action) => {

    let newToDoLists
    switch (action.type) {
        case "SET_TODOLISTS":
            return {...state, toDoLists: action.toDoLists.map(todo => ({...todo, tasks: []}))}
        case "SET_TASKS":
            return {
                ...state, toDoLists: state.toDoLists.map(todo => {
                    if (todo.id !==action.todoListId){
                        return todo
                    }else {
                        return {...todo,tasks: action.tasks}
                    }
                        })
            }
        case "ADD_TO_DO_LIST":
            newToDoLists = [...state.toDoLists, {...action.newToDoList, tasks: []}];
            return {...state, toDoLists: newToDoLists}
        case "ADD_TASK":
            newToDoLists = state.toDoLists.map(todo => {
                if (todo.id !== action.newTask.todoListId) {
                    return todo
                } else {
                    return {...todo, tasks: [...todo.tasks, action.newTask]}
                }
            });
            return {...state, toDoLists: newToDoLists}
        case "CHANGE_TASK":
            newToDoLists = state.toDoLists.map(todo => {
                if (todo.id !== action.toDoListId) {
                    return todo
                }else {
                    return {...todo,tasks: [...todo.tasks.map(task=>{
                            if (task.id !==action.taskId){
                                return task
                            }else {
                                return {...task,...action.obj}
                            }
                        })]}
                }
            });
            return {...state,toDoLists: newToDoLists}
        case "DELETE_TO_DO_LIST":
            return {...state,toDoLists: state.toDoLists.filter(toDoList=>{
                    return toDoList.id !== action.toDoListId
                })}
        case "DELETE_TASK":
            return {...state,
                toDoLists:state.toDoLists.map(todo=>{
                    if (todo.id !==action.toDoListId){
                        return todo
                    }else {
                        return {...todo,tasks: todo.tasks.filter(task=>{
                                return  task.id!==action.taskId
                            })}
                    }})
            }
    }
    return state;
}
export const   set_toDoListsAC=(toDoLists)=>{
    return{
        type: "SET_TODOLISTS",
        toDoLists: toDoLists,
    }
}


export const addToDoListAC = (newToDoList) => {
    return {
        type: "ADD_TO_DO_LIST",
        newToDoList: newToDoList
    }
}
export const addTaskAC = (newTask) => {
    return {
        type: "ADD_TASK",
        newTask

    }
}
export const changeTaskAC = (toDoListId, taskId, obj) => {
    return {
        type: "CHANGE_TASK",
        toDoListId: toDoListId,
        taskId: taskId,
        obj: obj
    }
}
export const deleteToDoListAC = (toDoListId) => {
    return {
        type: "DELETE_TO_DO_LIST",
        toDoListId: toDoListId,
    }
}
export const deleteTaskAC = (toDoListId, taskId) => {
    return {
        type: "DELETE_TASK",
        toDoListId: toDoListId,
        taskId: taskId
    }
}
export const setTasksAC = (tasks, todoListId) => {
    return {
        type: "SET_TASKS",
        tasks,
        todoListId
    }
}
export  const updateTaskAC=(task)=>{
    return{
        type:UPDATE_TASK,
        task:task
    }
}
// export const setStateFromLocalStorageAC=()=>{
// let dd=localStorage.getItem('asdf')
//     let  stateFromLS=JSON.parse()
//     return{
//         type:"SET-STATE-FROM-LOCALSTORAGE",
//         stateFromLS:stateFromLS
//     }
// }

import {createStore} from "redux";


const initialState = {
    toDoLists: [
    ]
}
const reducer = (state = initialState, action) => {

    let newToDoLists
    switch (action.type) {
        case "ADD-TO-DO-LIST":
            newToDoLists=[...state.toDoLists,action.newToDoList];
            return {...state,toDoLists: newToDoLists}
        case "ADD-TASK":
             newToDoLists=state.toDoLists.map(todo=>{
                 if (todo.id !==action.toDoListId){
                     return todo
                 }else {
                     return {...todo,tasks: [...todo.tasks,action.newTask]}
                 }
            });
            return {...state,toDoLists: newToDoLists}
        case "CHANGE-TASK":
            newToDoLists=state.toDoLists.map(todo=>{
                if (todo.id !==action.toDoListId){
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
        case "DELETE-TO-DO-LIST":
            return {...state,toDoLists: state.toDoLists.filter(toDoList=>{
                return toDoList.id !== action.toDoListId
                })}
        case "DELETE-TASK":
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

const store = createStore(reducer);
export default store;

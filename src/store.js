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
                if (todo.id!==action.toDoListId){

                }
            })
    }
    return state;
}

const store = createStore(reducer);
export default store;

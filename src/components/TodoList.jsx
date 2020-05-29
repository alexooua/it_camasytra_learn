import React from 'react';
import './../App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteToDoListAC, setTasksAC} from "../reducer";

import axios from "axios"

class TodoList extends React.Component {
//    Визывает реакт
    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [
        ],
        filterValue: "All"
    }
    nextTaskId = 1;
    //сохраняем в базу в браузере
    restoreState=()=>{
        axios.get( `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            })
            .then(response=>{

                if (!response.data.error){
                    this.props.setTasks(response.data.items,this.props.id)
                }
            })
    }
    // saveState = () => {
    //     localStorage.setItem('our-state-'+this.props.id, JSON.stringify(this.state))
    // }
    //востановлениве стейта
    // _restoreState = () => {
    //     let state = this.state
    //     let stateAsString = localStorage.getItem("our-state-"+this.props.id)
    //     if (stateAsString) {
    //         state = JSON.parse(stateAsString)
    //     }
    //
    //     this.setState(state,()=>{
    //         this.state.tasks.forEach(task=>{
    //             if (task.id>=this.nextTaskId){
    //                 this.nextTaskId=task.id+1
    //             }
    //         })
    //     })
    // }
    //добавление таскиа
    onAddTask = (newTitle) => {

        axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
            .then(response => {

                if (response.data.resultCode === 0) {
                    let newTask = response.data.data.item
                    this.props.addTask(newTask)
                }
            })
        this.nextTaskId++
    }
    //измененик фильтра
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, this.saveState)
    }

    //замена  таски
    changeTask = (task, newPropsObj) => {
        axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            {...task,...newPropsObj},
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
                .then(response=>{
                    if (response.data.resultCode===0){
                        this.props.updateTask(response.data.data.item)
                    }
                })
        )
        // this.props.changeTask()
        // this.setState({
        //     tasks: newTasks
        // }, this.saveState)
    }
    //замена статуса таски
    changeStatus = (taskId, status) => {
        this.props.changeTask(this.props.id, taskId, {status: status})
    }
    //замена названия таски
    changeTitle = (taskId, newTitle) => {
        this.props.changeTask(this.props.id, taskId, {title: newTitle})
    }
    onDeleteToDoList = () => {
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials:true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
            .then(response=>{
                if (response.data.resultCode===0)
                {this.props.deleteToDoList(this.props.id)}
            })

    }
    onDeleteTask = (taskId) => {

        this.props.deleteTask(this.props.id,taskId)

    }
    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">

                    <TodoListTitle title={this.props.title}
                                   id={this.props.id}/>

                    <button onClick={this.onDeleteToDoList}>DELETE
                    </button>

                    <AddNewItemForm addItem={this.onAddTask}/>


                    <TodoListTasks
                        onDeleteTask={this.onDeleteTask}
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        tasks={tasks.filter(t => {
                            return (this.state.filterValue === "All") ||
                                (this.state.filterValue === "Completed") && (t.status === 0) ||
                                (this.state.filterValue === "Active") && (t.status === 2)
                        })}/>

                    <TodoListFooter changeFilter={this.changeFilter}

                                    filterValue={this.state.filterValue}/>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {

        addTask: (newTask) => {
            const action = addTaskAC(newTask)

            dispatch(action)
        },
        changeTask: (toDoListId, taskId, obj) => {
            const action = changeTaskAC(toDoListId, taskId, obj)

            dispatch(action)
        },
        deleteToDoList: (toDoListId) => {
            const action = deleteToDoListAC(toDoListId)
            dispatch(action)
        },
        deleteTask: (toDoListId, taskId) => {
            const action = deleteTaskAC(toDoListId, taskId)
            dispatch(action)
        },
        setTasks:(tasks,todoListId)=>{
            dispatch(setTasksAC(tasks,todoListId))
        },
        updateTask:(task)=>{
            dispatch(updateTaskAC(task))
        }
    }
}
const ToDoListConnect = connect(null, mapDispatchToProps)(TodoList);
export default ToDoListConnect;

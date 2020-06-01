import React from 'react';
import './../App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, deleteTaskAC, deleteToDoListAC, setTasksAC, updateTaskAC} from "../reducer";

import axios from "axios"
import api from "./api";

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

    onAddTask = (newTitle) => {

        api.addTask(newTitle,this.props.id)
            .then(response => {

                if (response.data.resultCode === 0) {
                    let newTask = response.data.data.item
                    this.props.addTask(newTask)
                }
            })
    }
    //измененик фильтра
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }

    //замена  таски
    changeTask = (task, newPropsObj) => {

        let newTask = {...task, ...newPropsObj}
        axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            newTask,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        ).then(response => {

            if (response.data.resultCode === 0) {
                this.props.updateTask(response.data.data.item)
            }
        })

    }
    //замена статуса таски
    changeStatus = (task, status) => {

        this.changeTask(task, {status: status})
    }
    //замена названия таски
    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle})
    }
    onDeleteToDoList = () => {
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteToDoList(this.props.id)
                }
            })

    }
    onDeleteTask = (taskId) => {
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "30e72227-8e6a-43bd-abeb-5f8819797dc9"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })

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
        // changeTask: (toDoListId, taskId, obj) => {
        //     const action = changeTaskAC(toDoListId, taskId, obj)
        //
        //     dispatch(action)
        // },
        deleteToDoList: (toDoListId) => {
            const action = deleteToDoListAC(toDoListId)
            dispatch(action)
        },
        deleteTask: (toDoListId, taskId) => {
            const action = deleteTaskAC(toDoListId, taskId)
            dispatch(action)
        },
        setTasks: (tasks, todoListId) => {
            dispatch(setTasksAC(tasks, todoListId))
        },
        updateTask: (task) => {
            dispatch(updateTaskAC(task))
        }
    }
}
const ToDoListConnect = connect(null, mapDispatchToProps)(TodoList);
export default ToDoListConnect;

import React from 'react';
import './../App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, addToDoListAC, changeTaskAC, deleteTaskAC, deleteToDoListAC} from "../reducer";

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
    saveState = () => {
        localStorage.setItem('our-state-'+this.props.id, JSON.stringify(this.state))
    }
    //востановлениве стейта
    restoreState = () => {
        let state = this.state
        let stateAsString = localStorage.getItem("our-state-"+this.props.id)
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }

        this.setState(state,()=>{
            this.state.tasks.forEach(task=>{
                if (task.id>=this.nextTaskId){
                    this.nextTaskId=task.id+1
                }
            })
        })
    }
    //добавление таскиа
    onAddTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        }

        this.nextTaskId++
        this.props.addTask(this.props.id, newTask)


        // let newTasks = [...this.state.tasks, newTask]
        // this.setState({
        //     tasks: newTasks
        // }, this.saveState)

    }
    //измененик фильтра
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, this.saveState)
    }

    //замена  таски
    changeTask = (taskId, newPropsObj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t
            } else {
                return {...t, ...newPropsObj}
            }
        })
        // this.props.changeTask()
        // this.setState({
        //     tasks: newTasks
        // }, this.saveState)
    }
    //замена статуса таски
    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id, taskId, {isDone: isDone})
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
                headers:{"API_KEY":"bdf52653-d6b7-4a3f-a378-af4831d7858c"}
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
let {tasks=[]}=this.props
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
                                (this.state.filterValue === "Completed") && (t.isDone === true) ||
                                (this.state.filterValue === "Active") && (t.isDone === false)
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

        addTask: (toDoListId, newTask) => {
            const action = addTaskAC(toDoListId, newTask)

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
        }
    }
}
const ToDoListConnect = connect(null, mapDispatchToProps)(TodoList);
export default ToDoListConnect;

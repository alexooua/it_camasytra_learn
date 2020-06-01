import React from 'react';
import './../App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTodoListTitleAC, deleteTaskAC, deleteToDoListAC, setTasksAC, updateTaskAC} from "../reducer";
import api from "./api";

class TodoList extends React.Component {
//    Визывает реакт
    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [],
        filterValue: "All"
    }
    //сохраняем в базу в браузере
    restoreState=()=>{
        let id =this.props.id
        api.getTask(id)
            .then(response=>{

                if (!response.data.error){
                    this.props.setTasks(response.data.items,id)
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
    onChangeTask = (task, newPropsObj) => {
        let newTask = {...task, ...newPropsObj}
        api.ChangeTask(newTask)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.updateTask(response.data.data.item)
                }
            })

    }
    //замена статуса таски
    changeStatus = (task, status) => {

        this.onChangeTask(task, {status: status})
    }
    //замена названия таски
    changeTitle = (task, newTitle) => {
        this.onChangeTask(task, {title: newTitle})
    }
    onDeleteToDoList = () => {
        let id =this.props.id
        api.deleteToDoList(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteToDoList(id)
                }
            })

    }
    onDeleteTask = (taskId) => {
        let id = this.props.id
        api.deleteTask(taskId, id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(id, taskId)
                }
            })

    }

    setToDoListsTitle = (title) => {
        let id = this.props.id
        api.onchangeTodoListTitle(title, id)
            .then(response=> {
                if (response.data.resultCode === 0) {
                    this.props.changeTodoListTitle(title, id)
                }
            })
    }

    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">

                    <TodoListTitle
                        onSetToDoListsTitle={this.setToDoListsTitle}
                        todoListMode={this.props.todoListMode}
                        title={this.props.title}
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
        },
        changeTodoListTitle: (title, todoListId) => {
            dispatch(changeTodoListTitleAC(title, todoListId))
        }
    }
}
const  ConnectTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectTodoList;

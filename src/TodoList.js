import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";

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
    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        }
        this.nextTaskId++
        let newTasks = [...this.state.tasks, newTask]
        this.setState({
            tasks: newTasks
        }, this.saveState)

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
        this.setState({
            tasks: newTasks
        }, this.saveState)
    }
    //замена статуса таски
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }
    //замена названия таски
    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
    }


    render = () => {

        return (
            <div className="App">
                <div className="todoList">

                    <TodoListTitle  title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask} />


                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
                            return (this.state.filterValue === "All")  ||
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

export default TodoList;


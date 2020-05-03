import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";


class App extends React.Component {

    state = {
        toDoLists: [
        ],
        filterValue: "All"
    }
    // id для листов
    nextToDoListId =1

    //загружаем в стейт с базы в браузере
    componentDidMount() {
        this.restoreState()
    }
    //сохраняем в базу в браузере
    saveState = () => {
        localStorage.setItem('toDoLists', JSON.stringify(this.state))
    }
    //востановлениве стейта
    restoreState = () => {
        let state = this.state
        let stateAsString = localStorage.getItem('toDoLists')
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }
        // вторым параметром передаём func ответсвенную за коректный id
        this.setState(state,()=>{
            this.state.toDoLists.forEach(todo=>{
                if (todo.id>=this.nextTaskId){
                    this.nextTaskId=todo.id+1
                }
            })
        })
    }
    //додаём лист в стейт
    onAddToDoList = (newToDoListName) => {
        let newToDoListApp = {
            title: newToDoListName,
            id: this.nextToDoListId,
            tasks: []
        }
        this.props.addToDoList(newToDoListApp)
        this.nextToDoListId++

    }

    render = () => {
        let toDoLists = this.props.toDoLists.map(t => {
                return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
            }
        )
        return (
            <>
                <AddNewItemForm addItem={this.onAddToDoList}/>
                <div className="App">
                    {toDoLists}
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        toDoLists: state.toDoLists
    }
}
const mapDispatchToProps=(dispatch)=>{

    return {

       addToDoList:(newToDoList)=>{
           const action={
               type:"ADD-TO-DO-LIST",
               newToDoList:newToDoList
           }
           dispatch(action)
       }
    }
}
const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectedApp;

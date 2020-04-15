import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {

    state = {
        todolists: [
        ],
        filterValue: "All"
    }
    // id для листов
    nextTodoListId = 0

    //загружаем в стейт с базы в браузере
    componentDidMount() {
        this.restoreState()
    }
    //сохраняем в базу в браузере
    saveState = () => {
        localStorage.setItem('todolists', JSON.stringify(this.state))
    }
    //востановлениве стейта
    restoreState = () => {
        let state = this.state
        let stateAsString = localStorage.getItem('todolists')
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }
        // вторым параметром передаём func ответсвенную за коректный id
        this.setState(state,()=>{
            this.state.todolists.forEach(todo=>{
                if (todo.id>=this.nextTaskId){
                    this.nextTaskId=todo.id+1
                }
            })
        })
    }
    //додаём лист в стейт
    addTodoList = (newTodolistName) => {
        let newTodoList = {
            title: newTodolistName,
            id: this.nextTodoListId
        }
        this.nextTodoListId++
        this.setState({todolists: [...this.state.todolists, newTodoList]},
        this.saveState )
    }

    render = () => {
        let todolists = this.state.todolists.map(t => {
                return <TodoList key={t.id} id={t.id} title={t.title}/>
            }
        )
        return (
            <>
                <AddNewItemForm addItem={this.addTodoList}/>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

export default App;


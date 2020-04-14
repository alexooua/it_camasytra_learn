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
    nextTodoListId = 0

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {

        localStorage.setItem('todolists', JSON.stringify(this.state))
    }
    restoreState = () => {
        let state = this.state
        let stateAsString = localStorage.getItem('todolists')
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }

        this.setState(state,()=>{
            this.state.todolists.forEach(todo=>{
                if (todo.id>=this.nextTaskId){
                    this.nextTaskId=todo.id+1
                }
            })
        })
    }

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


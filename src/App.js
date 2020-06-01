import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addToDoListAC, set_toDoListsAC} from "./reducer";
import axios from "axios"
import api from "./components/api";


class App extends React.Component {

    state = {
        toDoLists: [
        ],
        filterValue: "All"
    }

    //загружаем в стейт с базы в браузере
    componentDidMount() {
        this.restoreState()

    }
    //сохраняем в базу в браузере
    // saveState = () => {
    //     localStorage.setItem('toDoLists', JSON.stringify(this.state))
    // }
    // //востановлениве стейта


    restoreState = () => {

        api.getTodoList()
            .then(res => {
                this.props.set_toDoLists(res.data)
            });
    }

    //додаём лист в стейт
    onAddToDoList = (newToDoListName) => {

       api.createTodolist(newToDoListName)
           .then(response=>{

               if (response.data.resultCode===0){
                   this.props.addToDoList(response.data.data.item)
               }
               })
    }

    render = () => {
        console.log(this.props)

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
           const action=addToDoListAC(newToDoList)
           dispatch(action)
       },
        set_toDoLists:(toDoLists)=>{
        const action=set_toDoListsAC(toDoLists)
        dispatch(action)
    }
    }
}
const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectedApp;

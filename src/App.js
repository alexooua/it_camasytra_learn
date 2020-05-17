import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addToDoListAC, set_toDoListsAC} from "./reducer";
import axios from "axios"


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
        debugger
    }
    //сохраняем в базу в браузере
    saveState = () => {
        localStorage.setItem('toDoLists', JSON.stringify(this.state))
    }
    //востановлениве стейта


    restoreState = () => {
        debugger
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                debugger
                console.log(res.data);
                this.props.set_toDoLists(res.data.toDoLists)
            });
    }

    //додаём лист в стейт
    onAddToDoList = (newToDoListName) => {
       axios.post(
           "https://social-network.samuraijs.com/api/1.1/todo-lists",
           {title:newToDoListName},
           {
               withCredentials:true,
               headers:{"API_KEY":"bdf52653-d6b7-4a3f-a378-af4831d7858c"}
           }
       )
           .then(response=>{
               debugger
               if (response.data.resultCode===0){
                   this.props.addToDoList(response.data.data.item())
               }
               }

           )
        // let newToDoListApp = {
        //     title: newToDoListName,
        //     id: this.nextToDoListId,
        //     tasks: []
        // }
        // this.props.addToDoList(newToDoListApp)
       // this.nextToDoListId++

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

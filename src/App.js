import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    tasks=[
        {title:"JS",isDone:false},
        {title:"CSS",isDone:true},
        {title:"React",isDone:false},
        {title:"SasS",isDone:true},
        {title:"Redux",isDone:false}
    ];
    filterValue="All";
    render = () => {

        return (
            <div className="App">
                <div className="todoList">

                    <TodoListHeader />

                    <TodoListTasks tasks={this.tasks}/>

                    <TodoListFooter filterValue={this.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;


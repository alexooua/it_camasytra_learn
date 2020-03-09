import React from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    // props={
    //     title:"JS",
    //     isDone:true
    // }

    render = () => {
       let taskElements=this.props.tasks.map(task=>{
           return <TodoListTask title={task.title} isDone={task.isDone}/>
       });
        return (
            <div className="todoList-tasks">
                {taskElements}

            </div>
        );
    }
}

export default TodoListTasks;
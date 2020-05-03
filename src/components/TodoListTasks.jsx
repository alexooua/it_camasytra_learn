import React from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {


    render = () => {
       let taskElements=this.props.tasks.map( (task,i)=>{
           return <TodoListTask
               onDeleteTask={this.props.onDeleteTask}
               key={i}
               changeTitle={this.props.changeTitle}
               changeStatus={this.props.changeStatus}
               task={task}

           />
       });
        return (
            <div className="todoList-tasks">

                {taskElements}

            </div>
        );
    }
}

export default TodoListTasks;

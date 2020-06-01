import React from "react";


class TodoListTitle extends React.Component {

state={
    title:this.props.title,
    todoListMode: false
}
    deActivateTodoListMode = () => {
        this.setState({todoListMode: false})
            this.props.onSetToDoListsTitle(this.state.title)
    }
    activateTodoListMode = () => {
        this.setState({todoListMode: true})
 }
    onTodoTitleChanged=(e)=>{
    this.setState({title:e.currentTarget.value})
    }
    render = () => {

        return (
            <div className="todoList-header">
                {this.state.todoListMode?<input
                    value={this.state.title}
                    autoFocus={true}
                    onBlur={this.deActivateTodoListMode}
                    onChange={this.onTodoTitleChanged}
                />:
                    <h3 className="todoList-header__title" onClick={this.activateTodoListMode }>{` ${this.props.title}`}</h3>}
            </div>
        );
    }
}
export default TodoListTitle;

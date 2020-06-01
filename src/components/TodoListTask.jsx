import React from "react";

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = () => {
        this.setState({editMode: false})
        this.props.changeTitle(this.props.task, this.state.title)
    }

    onIsDoneChanged = (e) => {
        let status=e.currentTarget.checked?2:0
        this.props.changeStatus(this.props.task,status)
    }
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    }

    onDeleteTask=()=>{
        this.props.onDeleteTask(this.props.task.id)
    }
    render = () => {
        //меняем клас от выполнения
        let taskClass = this.props.task.status ===2? "todoList-task done" : "todoList-task"
        return (

            <div className={taskClass}>
                {/*чекбокс*/}
                <input type="checkbox"
                       onChange={this.onIsDoneChanged}
                       checked={this.props.task.status===2}/>

                {/*титлы таски*/}
                {this.state.editMode ?
                    <input
                        value={this.state.title}
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        onChange={this.onTitleChanged}
                    />
                    : <span onClick={this.activateEditMode}>
                            {this.props.task.title}</span>}

                <span> - priority:{this.props.task.priority}</span>

                <button onClick={this.onDeleteTask}
                >DELETE
                </button>
            </div>

        );
    }
}

export default TodoListTask;

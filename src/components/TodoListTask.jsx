import React from "react";

class TodoListTask extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({editMode: true})

    }

    deActivateEditMode = () => {
        this.setState({editMode: false})

    }

    onIsDoneChanged = (e) => {
        let status=e.currentTarget.checked?2:0
        this.props.changeStatus(this.props.task,status)
    }
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
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
                        value={this.props.task.title}
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

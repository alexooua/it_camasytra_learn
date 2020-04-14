import React from "react";


class AddNewItemForm extends React.Component {

    state = {
        fullInput: "",
        title: ""
    }
    //    добавление таска поклику
    onAddItemClick = () => {

        if (this.state.title) {

            let newTitle = this.state.title

            this.setState({title: ""})
            this.props.addItem(newTitle)
            this.setState(
                {fullInput: ""})
        } else {
            this.setState(
                {fullInput: "fullInput"}
            )
        }
    }
    //изменения стейта при изменении каждово символа ввода
    onTitleChanged = (e) => {

        this.setState(
            {
                fullInput: "",
                title: e.currentTarget.value
            }
        )

    }
    //добавить таск по нажатию ентера
    onAddTaskKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();

        }
    };


    render = () => {

        return (

                <div className="todoListNewTaskForm">

                    <input className={this.state.fullInput}
                           onKeyPress={this.onAddTaskKeyPress}
                           type="text"
                           placeholder="New task name"
                           onChange={this.onTitleChanged}
                           value={this.state.title}
                    />

                    <button onClick={this.onAddItemClick}
                    >Add
                    </button>

                </div>
         );
    }
}
export default AddNewItemForm;

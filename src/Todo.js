import React, { Component } from "react";
import { TextInput, Button, Heading, Pane, IconButton } from "evergreen-ui";
import { connect } from "react-redux";
import {
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
  updateTodo,
  completeTodo
} from "./redux/actions";

class Todo extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
  }

  onSubmitHandle = event => {
    event.preventDefault();
    this.props.onAddTodo(event.target.item.value);
    event.target.item.value = "";
  };

  onDeleteHandle = id => {
    this.props.onDeleteTodo(id);
  };

  onEditHandle = (event, id, title) => {
    this.props.onEditTodo({ edit: true, id, title });
  };

  onUpdateHandle = event => {
    event.preventDefault();
    this.props.onUpdateTodo(event.target.updatedItem.value);
  };

  onCompleteHandle = id => this.props.onCompleteTodo(id);

  renderForm() {
    console.log({ f: this.props });
    if (this.props.edit) {
      const existingDesc = this.props.title;
      return (
        <form
          onSubmit={e => this.onUpdateHandle(e)}
          style={{ paddingLeft: "50px" }}
        >
          <TextInput
            name="updatedItem"
            className="item"
            defaultValue={existingDesc}
          />
          <Button
            className="update-add-item"
            appearance="primary"
            marginLeft={16}
          >
            Update
          </Button>
        </form>
      );
    }
  }

  componentDidMount() {
    this.props.onGetTodo();
  }

  render() {
    return (
      <div>
        <Heading
          size={800}
          marginTop="default"
          marginBottom="default"
          marginLeft={40}
        >
          Todo Master
        </Heading>
        <br />
        <form
          onSubmit={e => this.onSubmitHandle(e)}
          style={{
            paddingLeft: "50px",
            display: this.props.edit ? "none" : "block"
          }}
        >
          <TextInput name="item" />
          <Button
            className="btn-add-item"
            appearance="primary"
            intent="success"
            marginLeft={16}
            iconBefore="add"
          >
            Add
          </Button>
        </form>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "#fff",
            zIndex: "999",
            display: this.props.loading ? "block" : "none"
          }}
        >
          <h1>loading ...</h1>
        </div>
        {this.renderForm()}
        <ul>
          {this.props.todos.map(item => (
            <li key={item.id} className={item.done ? "done" : "hidden"}>
              <Heading size={400} marginTop="default" marginBottom="default">
                {item.title}
              </Heading>
              <Pane
                clearfix
                float="right"
                style={{
                  display: "flex"
                }}
              >
                <IconButton
                  marginRight={16}
                  height={24}
                  icon="trash"
                  appearance="primary"
                  intent="danger"
                  onClick={() => this.onDeleteHandle(item.id)}
                />

                <IconButton
                  marginRight={16}
                  height={24}
                  icon="edit"
                  appearance="primary"
                  intent="warning"
                  onClick={e => this.onEditHandle(e, item.id, item.title)}
                />
                <IconButton
                  marginRight={16}
                  height={24}
                  icon="tick"
                  appearance="primary"
                  intent="success"
                  onClick={() => this.onCompleteHandle(item.id)}
                />
              </Pane>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    edit: state.edit,
    id: state.id,
    loading: state.loading,
    title: state.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTodo: () => dispatch(getTodo()),
    onAddTodo: desc => dispatch(addTodo(desc)),
    onDeleteTodo: id => dispatch(deleteTodo(id)),
    onEditTodo: todo => dispatch(editTodo(todo)),
    onUpdateTodo: desc => dispatch(updateTodo(desc)),
    onCompleteTodo: id => dispatch(completeTodo(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);

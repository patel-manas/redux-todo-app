import React, { Component, createRef } from "react";
import { TextInput, Button, Heading, Pane, IconButton } from "evergreen-ui";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.ipRef = createRef();
    this.state = {
      edit: false,
      id: null,
      mockData: [
        {
          id: "1",
          title: "Buy Milk.",
          done: false,
          date: new Date()
        },
        {
          id: "2",
          title: "Meeting with Ali.",
          done: false,
          date: new Date()
        },
        {
          id: "3",
          title: "Tea break.",
          done: false,
          date: new Date()
        },
        {
          id: "4",
          title: "Go for a run.",
          done: false,
          date: new Date()
        }
      ]
    };
  }

  onSubmitHandle = event => {
    event.preventDefault();

    this.setState({
      mockData: [
        ...this.state.mockData,
        {
          id: Date.now(),
          title: event.target.item.value,
          done: false,
          date: new Date()
        }
      ]
    });

    event.target.item.value = "";
  };

  onDeleteHandle = id => {
    this.setState({
      mockData: this.state.mockData.filter(item => item.id !== id)
    });
  };

  onEditHandle = (event, id, title) => {
    this.setState({
      edit: true,
      id,
      title
    });
  };

  onUpdateHandle = event => {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item["title"] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });
    // this.ipRef.current.value = "";
    this.setState({
      edit: false
    });
  };

  onCompleteHandle = id => {
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item["done"] = true;
          return item;
        }

        return item;
      })
    });
  };

  renderForm() {
    if (this.state.edit) {
      return (
        <form
          onSubmit={e => this.onUpdateHandle(e)}
          style={{ paddingLeft: "50px" }}
        >
          <TextInput
            name="updatedItem"
            className="item"
            defaultValue={this.state.title}
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
            display: this.state.edit ? "none" : "block"
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
        {this.renderForm()}
        <ul>
          {this.state.mockData.map(item => (
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

export default Todo;

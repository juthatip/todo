import React, { Component } from 'react';

export class AddNote extends Component {
  constructor() {
    super();

    this.handleTitle = this.handleTitle.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.state = {
      title: '',
      tasks: [''],
      data: []
    }
  }

  handleTitle(e) {
    this.state.title = e.target.value;

    this.setState({
      title: this.state.title
    });

  }

  handleTasks(i, e) {
    this.state.tasks[i] = e.target.value;

    this.setState({
      tasks: this.state.tasks
    });

  }

  addTask() {
    this.state.tasks.push('');

    this.setState({
      tasks: this.state.tasks
    });
  }

  addTodo() {
    this.state.data.push({
      title: this.state.title,
      tasks: [...this.state.tasks]
    });
    this.setState({
      data: this.state.data
    });

    this.setState({
      title: '',
      tasks: ['']
    });
  }



  render() {
    // console.log(this.state.data);
    return (
      <div>
        TODOLIST:
       <h1>Title: <input type="text" onChange={this.handleTitle} value={this.state.title} /></h1>
        <div>
          {this.state.tasks.map((value, i)=>{
            return <p key={i}>Task: <input type="text" onChange={this.handleTasks.bind(this, i)} value={value} /></p>;
          })}

        </div>
        <a onClick={this.addTask.bind(this)}>+ Add todo</a>
        <div>
          <button onClick={this.addTodo}>Add your list</button>
        </div>

        <div>
          {
            this.state.data.map((obj, i)=> {
              return (
                <div key={i}> Your List {obj.title}
                  {
                    obj.tasks.map((task, a)=> {
                     return ( <p key={a}>{task}</p> )
                    })
                  }
                </div>
              )
            })
          }

        </div>
    </div>
  );
  }
}

export default AddNote;
import React, { Component } from 'react';

export class AddNote extends Component {
  constructor() {
    super();

    this.handleTitle = this.handleTitle.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      title: '',
      tasks: [''],
      data: []
    }

    this.store = [];

    //fetch data from firebase

    var todo = firebase.database().ref('todolist');

    todo.on('value', (snapshot) => {

      let data = snapshot.val();
      let dataArr = Object.keys(data).map(key => data[key]);

      this.store = dataArr;
      // console.log(dataArr);
      this.setState({
        data: this.store
      });

    });

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

  deleteTask(i, e) {
    // this.state.data[i].splice();
    let item = this.state.data;
    let test = item.splice(i, 1);

    console.log(test);



    // this.setState({
    //   tasks: test
    // });
  }

  addTodo() {

    this.state.data.push({
      title: this.state.title,
      tasks: [...this.state.tasks]
    });

    // this.setState({
    //   data: this.state.data
    // });

    this.setState({
      data: this.data
    });

    var todoKey = firebase.database().ref().child('todolist').push().key;

    firebase.database().ref('todolist/' + todoKey ).set({
      title: this.state.title,
      tasks: this.state.tasks
    });


    this.setState({
      title: '',
      tasks: ['']
    });
  }

  handleSearch(e) {

    let data = this.store;
    let textSearch = e.target.value;
    let todoListFilter = data;
    // console.log(data);
    // console.log(textSearch);
    if(textSearch !== '') {
        todoListFilter = data.filter((t) => t.title === textSearch);
    }

    this.setState({data: todoListFilter});

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


        <br />
        <div>
          Search Todo <input type="text" onChange={this.handleSearch}  />
        </div>

        <div>
          {
           this.state.data.map((object, i)=>{
            return(
              <div key={i}>
                Title: {object.title}

                {object.tasks.map((task, i) => {
                  return (
                    <span key={i}>&nbsp; &#9652; {task}</span>
                  );
                })
                }
                <a onClick={this.deleteTask.bind(this, i)} className="red">&nbsp; x Delete</a>
              </div>
            );
           })
          }
        </div>
    </div>
  );
  }
}

export default AddNote;
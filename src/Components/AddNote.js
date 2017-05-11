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

  deleteTask(i) {

    let item = this.state.data;
    item.splice(i, 1);

    this.setState({
      data: item
    });

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

  editTask(i) {
    let data = this.state.data;
    if (!data[i].hasOwnProperty('editable')) {
      data[i].editable = true;
    } else {
      data[i].editable = !data[i].editable;
    }

    this.setState({
      data: data
    })
  }

  handleEditTitle(i, e) {
    let data = this.state.data;
    data[i].title    = e.target.value;

    this.setState({
      data: data
    })
  }

  handleEditTask(i, j, e) {
    let data = this.state.data;
    data[i].tasks[j] = e.target.value;

    this.setState({
      data: data
    })

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

  editableTitle(object, i) {
    console.log(object);
    if (object.editable) {
      return <input type="text" onChange={this.handleEditTitle.bind(this, i)} value={object.title} />
    } else {
      return object.title;
    }
  }

  editableTasks(task, object, i, j) {
    if (object.editable) {
      return <input type="text" value={task} onChange={this.handleEditTask.bind(this, i, j)} />
    } else {
      return <span key={j}>&nbsp; &#9652; {task}</span>;
    }
  }

  editBtn(object) {
    if (object.editable) {
      return 'save';
    } else {
      return 'edit';
    }
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
                {/*Title: {object.title}*/}

                Title: {this.editableTitle(object, i)}

                {/*<input type="text" key={i} value={object.title} onChange={this.handleEditTitle.bind(this, i)}/>*/}

                {object.tasks.map((task, j) => {
                  return (
                    <div key={j}>
                      {/*<span key={j}>&nbsp; &#9652; {task}</span>*/}
                      {/*<input type="text" value={task} onChange={this.handleEditTask.bind(this, i, j)} />*/}
                      {this.editableTasks(task, object, i, j)}
                    </div>
                  );
                })
                }

                <a onClick={this.editTask.bind(this, i)} className="blue">&nbsp; {this.editBtn(object)}</a>
                <a onClick={this.deleteTask.bind(this, i)} className="red">&nbsp; Delete</a>
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
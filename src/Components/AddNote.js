import React, { Component } from 'react';

export class AddNote extends Component {
  constructor() {
    super();

    this.handleTitle = this.handleTitle.bind(this);
    // this.handleLists = this.handleLists.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.state = {
      data: [
        {title: '', lists: ['']}
      ]
    }
  }

  handleTitle(e) {
    this.state.title = e.target.value;
  }

  handleLists(i, e) {
    // let lists = this.state.lists;
    // lists[i] = e.target.value;

    // this.setState({
    //   test: [
    //     {title: title, lists: lists}
    //   ]
    // })

    console.log(this.state.lists);



  }

  addTodo() {

    let title = this.state.title;
    let lists  = this.state.lists;
    // console.log(this.state.data);

    this.setState({
      data: [
        {
          title: title,
          lists: lists
        }
      ]
    });


  }

  render() {
    return (
      <div>
        TODOLIST:
       <h1>Title: <input type="text" onChange={this.handleTitle} /></h1>
        <p></p>
        <div>
          {this.state.data.lists.map((value, i)=>{
            return <p key={i}>lists: <input type="text" onChange={this.handleLists.bind(this, i)} /></p>;
          })}

        </div>
        <a>+ Add todo</a>
        <div>
          <buttton onClick={this.addTodo}>Add your list</buttton>
        </div>
    </div>
  );
  }
}

export default AddNote;
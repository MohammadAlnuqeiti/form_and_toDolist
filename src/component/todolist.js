import React, { Component } from 'react'

export default class Todolist extends Component {

    constructor(props){
        super(props);
        this.state = {
            lists:[],
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const lists=this.state.lists;
        let list = e.target.list.value;
        lists.push(list)
        this.setState({
            lists: lists,
        })
        console.log(this.state.lists);

    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" name='list'  />
            <button type='submit'>submit</button>
        </form>
         {this.state.lists.map((ele,index)=>{
                return <p key={index}>{ele}</p> 
            })}
        </div>
    )
  }
}

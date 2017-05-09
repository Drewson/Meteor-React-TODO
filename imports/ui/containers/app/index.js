import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import './styles.css';
import ToDoCount from '../../components/todocount'
import ClearButton from '../../components/clearbutton'
import ToDoItem from '../../components/todoitem'
import AccountsUIWrapper from '../../components/AccountsUiWrapper/index';
import { ToDos } from '../../../api/todos';

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: ''
    } 

    this.addToDo = this.addToDo.bind(this);

   }

  toggleComplete(item){
    ToDos.update( { _id: item._id }, {"$set": {
      complete: !item.complete
    }})
  }

  removeTodo(item){
    ToDos.remove({ _id: item._id })
  }

  removeCompleted(){
    this.props.todos.forEach( todo => {
      if(todo.complete === true){
        ToDos.remove({ _id: todo._id })
      }
    })
  }

  hasCompleted(){
    let newTodos = this.props.todos.filter((todo) => (todo.complete));
    if(newTodos.length > 0 ){
      return true;
    } else {
      return false;
    }
  }

  addToDo(event){
    event.preventDefault();

    if( this.state.inputValue ){
       ToDos.insert({ 
         title: this.state.inputValue,
         complete: false
       })

       this.setState({
         inputValue: ''
       })
    }
  }

  componentDidMount(){
    // this.state.input.focus();
  }

  onInputChange(event){
    this.setState({
      inputValue : event.target.value
    })
  }

  render() {

    const todos = this.props.todos;

    return (
      <div className='app-wrapper'>
        <div className='login-wrapper'>
          <AccountsUIWrapper />
        </div>
        <div className="todo-list">

        <h1>ToDo</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
              <input type="text" onChange={(e) => this.onInputChange(e)} value={this.state.inputValue}/>
              <span>(press enter to add)</span>
          </form>
        </div>

          <ul>
            {todos.map((todo, i) => (
              <ToDoItem  
                item={todo} 
                key={i} 
                toggleComplete={() => this.toggleComplete(todo)}
                removeTodo={() => this.removeTodo(todo)}
              />
            ))}
          </ul>

          <div className='todo-admin'> 
            <ToDoCount numb={this.props.todos.length} />
            { this.hasCompleted() && 
              <ClearButton removeCompleted={() => this.removeCompleted()} />  
            }
          </div>
          
        </div>
      </div>
    );
  }
}

App.PropTypes = {
  todos: PropTypes.array.isRequired,
}

App.defaultProps = {
  todos: []
}


export default createContainer(() => {
  return {
    todos: ToDos.find({}).fetch()
  };
}, App);


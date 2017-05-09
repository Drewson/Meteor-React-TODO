import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/containers/app/index';
import './main.css';
import { createStore,  } from 'redux'

const initialState = {
  todos: [],
  lastId: 1
}
const addTodo = (payload) => ({ type: 'ADD_TODO', payload })
const removeTodo = (payload) => ({ type: 'REMOVE_TODO', payload })

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_TODO': 
      const todo = {
        id: state.lastId,
        text: action.payload,
        completed: false
      };
      return { 
        ...state,
        todos: [...state.todos, todo],
        lastId: state.lastId + 1 };
    case 'REMOVE_TODO':
      const todos = state.todos.filter( todo => action.payload !== todo.id);
        return { ...state, todos };
    default: 
      return state;
  }
}
const store = createStore( reducer);

store.dispatch(addTodo('make next feature'));
store.dispatch(addTodo('make next feadasdaure'));
store.dispatch(addTodo('make next featdsade'));
store.dispatch(addTodo('make next feature'));
store.dispatch(addTodo('make next feature'));
console.log('initial: ', store.getState());

store.dispatch(removeTodo(4))
console.log('after: ', store.getState());

Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
});

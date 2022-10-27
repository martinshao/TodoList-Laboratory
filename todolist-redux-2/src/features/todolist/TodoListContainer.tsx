import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActionCreators from './TodoActionCreators';
import TodoList from './Todolist';

console.log('TodoActionCreators', TodoActionCreators);

function TodoListContainer(props: { dispatch: any; todos: any }) {

  // Injected by react-redux:
  const { dispatch, todos } = props;
  console.info('todos: ', todos)

  const boundActionCreators = useMemo(
    () => bindActionCreators(TodoActionCreators, dispatch),
    [dispatch]
  );
  console.log('boundActionCreators', boundActionCreators);

  useEffect(() => {
    // Note: this won't work:
    // TodoActionCreators.addTodo('Use Redux')

    // You're just calling a function that creates an action.
    // You must dispatch the action, too!

    // This will work:
    // let action = TodoActionCreators.addTodo('Use Redux');
    // dispatch(action);
  }, []);

  return <TodoList todos={todos} {...boundActionCreators} />;
}

export default connect((state: string[]) => {
  console.info('connect', state)
  return {
    todos: state,
  }
})(TodoListContainer);

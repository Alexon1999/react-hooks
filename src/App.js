import React, { useState } from 'react';
import './App.css';

//* Deux manière d'utiliser props dans function component
// ? 1) mettre props directement dans la fonction
// // function Todo(props) {
// //  return <div className='todo'>{props.todo.text}</div>;
// // }

// ? 2) utiliser destructure
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
      className='todo'>
      {todo.text}
      <div>
        {/* arrow function appele un autre fonction de props */}
        {/* ici on passe des info */}
        {/* 2 manière donc de faire */}
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={removeTodo.bind(this, index)}>Delete</button>
      </div>
    </div>
  );
}

//* input fields
function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    // clear the form so the value
    setValue('');
  };

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        placeholder='Add Todo...'
        value={value}
        // **************Pareil***********
        // onChange={(e) => setValue(e.target.value)}
        onChange={changeValue}
      />
    </form>
  );
}

// * Main App
function App() {
  //* c'est function state
  const [todos, setTodos] = useState([
    {
      text: 'Learn React',
      isCompleted: false,
    },
    {
      text: 'play Football',
      isCompleted: true,
    },
    {
      text: 'Meeting with my boss',
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];

    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    // console.log(newTodos);
    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          //* ici on passe index et todo au component Todo
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;

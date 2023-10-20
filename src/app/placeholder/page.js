'use client';

import { useEffect, useState } from 'react';
import './page.css';
import Link from 'next/link';

export default function About() {
  // use state for manipulate and use the data
  const [todos, setTodos] = useState();

  // call the api
  async function getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    // insert to state
    setTodos(data);
  }

  // render
  useEffect(() => {
    getTodos();
  }, []);

  // JSX Code
  return (
    <main className='main-container'>
      <Link href='/'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>JSON Placeholder data API</h1>
      <div className='body'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

import './App.css';
import { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    //this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      const data = snapshot.docs
      if (data) {
          if (!data.createdAt && snapshot.metadata.hasPendingWrites) {
              
              const ts = firebase.firestore.Timestamp.now()
              setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, date: ts}))) 
              
              //console.log(`timestamp: ${ts} ${new Date(ts.seconds*1000)} (estimated)`)
              /*earlier I was having a null timestamp issue because setTodos was taking
              firestore serverTimestamp but it's a token in client side and not immediately available.
              So, that's why I implemented this step i.e. when a todo is created it takes local timestamp
              and later when refreshed, takes the timestamp from server without affecting the functionality
               and there's just a slight difference between local and server timestamp */
              // we don't have a value for createdAt yet
          }
          else {
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, date: doc.data().timestamp})))
          }
      }
    })
  }, []);
  

  const addTodo = (event) => {
    event.preventDefault();  //prevent page from refreshing

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }

  return (
    <div className="App">
     <h1>Quick TODO List</h1>

     <form>
        <FormControl>
          <InputLabel>Add a todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button size="medium" type="submit" disabled={!input} onClick={addTodo}
         variant="contained" color="primary">
          Add Todo
        </Button>
     </form>     

     <ul>
       {todos.map(todo => (
         <Todo todo={todo}/>
         ))}  
     </ul>

    </div>
  );
}

export default App;

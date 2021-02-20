import React from 'react'
import './Todo.css'
import db from './firebase'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox  } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Todo(props) {
    //console.log(new Date(props.todo.date.seconds*1000));
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const dateConverter = (date) => {
        var options = { year: 'numeric', month: 'short', day: 'numeric'};
        return new Date(date).toLocaleDateString("en-US", options);;
    }
    //secondary={props.todo.timestamp.toDate()}
    //secondary={new Date(props.todo.date.seconds*1000)}

    return (
        <List className="todo_list">
            <ListItem>
                <Checkbox id={props.todo.id} checked={checked} onChange={handleChange} color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }} />
                <ListItemText primary={props.todo.todo} secondary={dateConverter(new Date(props.todo.date.seconds*1000))}/>
                <ListItemSecondaryAction>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={event => db.collection('todos').doc(props.todo.id).delete()}
                     edge="end" aria-label="delete" size="medium">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}

export default Todo

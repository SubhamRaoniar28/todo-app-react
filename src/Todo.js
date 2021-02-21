import React, { useState } from 'react'
import './Todo.css'
import db from './firebase'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Modal, makeStyles, Button  } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3)
    }
}));

function Todo(props) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const dateConverter = (date) => {
        var options = { year: 'numeric', month: 'short', day: 'numeric'};
        return new Date(date).toLocaleDateString("en-US", options);;
    }
    //secondary={props.todo.timestamp.toDate()}
    //secondary={new Date(props.todo.date.seconds*1000)}

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    }

    return (
        <>
        <Modal open={open} onClose={handleClose} >
            <div className={classes.paper}>
                <h1>Edit Todo</h1>
                <TextField label="Size" id="standard-size-small" defaultValue={props.todo.todo} size="small" 
                    value={input} onChange={event => setInput(event.target.value)}/>
                <Button size="small" variant="contained" color="primary" onClick={updateTodo}>Submit</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <Checkbox id={props.todo.id} checked={checked} onChange={handleChange} color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }} />
                <ListItemText primary={props.todo.todo} secondary={dateConverter(new Date(props.todo.date.seconds*1000))}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={e => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={event => db.collection('todos').doc(props.todo.id).delete()}
                     edge="end" aria-label="delete" size="medium">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        </List>
        </>
    )
}

export default Todo

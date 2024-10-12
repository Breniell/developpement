import React, { useState } from 'react';
import { Paper, TextField, Select, MenuItem, Button, List, ListItem, Checkbox, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
  const [taskInput, setTaskInput] = useState('');
  const [assignedPersonnel, setAssignedPersonnel] = useState('');
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '' && assignedPersonnel !== '') {
      const newTask = { text: taskInput, assignedTo: assignedPersonnel, completed: false, priority: 1 };
      setTasks([...tasks, newTask]);
      setReports([...reports, newTask]);
      setTaskInput('');
      setAssignedPersonnel('');
      toast.success('Tâche ajoutée avec succès');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    toast.error('Tâche supprimée avec succès');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const editTask = (index) => {
    const editedTaskText = prompt('Modifier la tâche :', tasks[index].text);

    if (editedTaskText !== null) {
      const updatedTasks = tasks.map((task, i) => {
        if (i === index) {
          return { ...task, text: editedTaskText };
        }
        return task;
      });

      setTasks(updatedTasks);
      toast.info('Tâche modifiée avec succès');
    }
  };

  return (
    <div className="container">
      <Paper className="paper">
        <h1 className="heading">Gestion du Personnel et des Tâches</h1>
        <TextField
          label="Ajouter une tâche"
          variant="outlined"
          fullWidth
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="task-input"
        />
        <Select
          value={assignedPersonnel}
          onChange={(e) => setAssignedPersonnel(e.target.value)}
          displayEmpty
          className="select"
        >
          <MenuItem value="" disabled>
            Assigner une tâche à
          </MenuItem>
          <MenuItem value="Alice">Alice</MenuItem>
          <MenuItem value="Bob">Bob</MenuItem>
          <MenuItem value="Charlie">Charlie</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addTask}
          className="add-button"
        >
          Ajouter
        </Button>
        <TextField
          label="Rechercher une tâche"
          variant="outlined"
          fullWidth
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="search-input"
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          className="filter"
        >
          <MenuItem value="">Toutes les tâches</MenuItem>
          <MenuItem value="completed">Tâches terminées</MenuItem>
          <MenuItem value="inProgress">Tâches en cours</MenuItem>
          <MenuItem value="todo">Tâches à faire</MenuItem>
        </Select>
        <List className="list">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                                  <div {...provided.droppableProps} ref={provided.innerRef}>
                                  {tasks.map((task, index) => (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: 'none',
                                            padding: '8px',
                                            margin: '0 0 8px 0',
                                            backgroundColor: snapshot.isDragging ? '#f5f5f5' : '#ffffff',
                                            boxShadow: snapshot.isDragging ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                                            ...provided.draggableProps.style
                                          }}
                                        >
                                          <ListItem>
                                            <Checkbox
                                              checked={task.completed}
                                              onChange={() => toggleTaskCompletion(index)}
                                            />
                                            <ListItemText
                                              primary={task.text}
                                              secondary={`Assignée à : ${task.assignedTo}`}
                                              className={task.completed ? 'completed-task' : ''}
                                            />
                                            <Button
                                              variant="contained"
                                              color="secondary"
                                              onClick={() => deleteTask(index)}
                                              startIcon={<DeleteIcon />}
                                            >
                                              Supprimer
                                            </Button>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              onClick={() => editTask(index)}
                                            >
                                              Modifier
                                            </Button>
                                          </ListItem>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                          </Droppable>
                        </DragDropContext>
                      </List>
                    </Paper>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                  </div>
                );
              };
              
              export default App;
              
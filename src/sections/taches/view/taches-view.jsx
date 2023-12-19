/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import API_URL from '../../../config';
import TaskCard from '../components/TaskCard';



export default function TacheView() {

  const [tasks, setTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTasks = async () => {
       try {
          const response = await axios.get(`${API_URL}/taches/`); // Mettez l'URL correcte de votre API Django
          setTasks(response.data);
          setLoading(false);
       // eslint-disable-next-line no-shadow
       } catch (error) {
          console.error('Erreur lors de la récupération des clients :', error);
          setError(error);
          setLoading(false);
       }
    };

    fetchTasks();
 }, []);
  return (
    <Container maxWidth="xl">
      <p>taches view</p>
      <Grid>
        ff
      </Grid>
      <Grid container spacing={3}>
      {tasks.map((task, index) => (
        <TaskCard key={task.id} task={task} index={index} />
      )) }
    </Grid>
    </Container>
  );
}

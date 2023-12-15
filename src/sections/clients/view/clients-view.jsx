/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import API_URL from '../../../config';
import ClientCard from '../components/ClientCard';


export default function ClientView() {
  const [clients, setclients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTechniciens = async () => {
       try {
          const response = await axios.get(`${API_URL}/clients/`); // Mettez l'URL correcte de votre API Django
          setclients(response.data);
          setLoading(false);
       // eslint-disable-next-line no-shadow
       } catch (error) {
          console.error('Erreur lors de la récupération des clients :', error);
          setError(error);
          setLoading(false);
       }
    };

    fetchTechniciens();
 }, []);
  return (
    <Container maxWidth="xl">
      <p>cliens view</p>
      <Grid container spacing={3}>
      {clients.map((client, index) => (
        <ClientCard key={client.id} client={client} index={index} />
      )) }
    </Grid>
    </Container>
  );
}

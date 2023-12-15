/* eslint-disable no-unused-vars */
import Axios from 'axios';
/* eslint-disable react/button-has-type */
import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';

import {
    Button,
    TextField,
  } from '@mui/material';

import API_URL from 'src/config';

import SelectField from 'src/components/form/SelectField';

const ActiviteComponent = ({ values, onChange }) => {
  const [activites, setActivites] = useState([]);
  const [newActivite, setNewActivite] = useState({ name: '', description: '' });



  useEffect(() => {
    // Charger toutes les activités lors du montage du composant
    Axios.get(`${API_URL}/activites/`)
      .then(response => setActivites(response.data))
      .catch(error => console.error('Erreur lors du chargement des activités', error));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewActivite(prevState => ({ ...prevState, [name]: value }));
    console.log(newActivite);
  };

  const handleCreateActivite = () => {
    // Envoyer une requête POST pour créer une nouvelle activité
    Axios.post(`${API_URL}/activites/`, newActivite)
      .then(response => {
        setActivites(prevState => [...prevState, response.data]);
        setNewActivite({ name: '', description: '' });
      })
      .catch(error => console.error('Erreur lors de la création de l\'activité', error));
  };

  return (
    <div>
        <SelectField 
        name="activite" 
        label="activites" 
        value={values}
        options={activites} 
        onChange={onChange}
        multiple
        />
      <h2>Créer une nouvelle activité</h2>
      <TextField type="text" name="name" value={newActivite.name} onChange={handleInputChange} placeholder="Nom de l'activité" />
      <TextField name="description" value={newActivite.description} onChange={handleInputChange} placeholder="Description de l'activité" />
      <Button onClick={handleCreateActivite}>Créer</Button>
    </div>
  );
};

ActiviteComponent.propTypes = {
  onChange: PropTypes.any,
  values: PropTypes.any
}

export default ActiviteComponent;

/* eslint-disable react/button-has-type */
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

const ActiviteComponent = () => {
  const [activites, setActivites] = useState([]);
  const [newActivite, setNewActivite] = useState({ name: '', description: '' });

  useEffect(() => {
    // Charger toutes les activités lors du montage du composant
    Axios.get('URL_DE_VOTRE_API/activites/')
      .then(response => setActivites(response.data))
      .catch(error => console.error('Erreur lors du chargement des activités', error));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewActivite(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateActivite = () => {
    // Envoyer une requête POST pour créer une nouvelle activité
    Axios.post('URL_DE_VOTRE_API/activites/', newActivite)
      .then(response => {
        setActivites(prevState => [...prevState, response.data]);
        setNewActivite({ name: '', description: '' });
      })
      .catch(error => console.error('Erreur lors de la création de l\'activité', error));
  };

  return (
    <div>
      <h2>Liste des activités</h2>
      <ul>
        {activites.map(activite => (
          <li key={activite.id}>{activite.name} - {activite.description}</li>
        ))}
      </ul>
      <h2>Créer une nouvelle activité</h2>
      <input type="text" name="name" value={newActivite.name} onChange={handleInputChange} placeholder="Nom de l'activité" />
      <textarea name="description" value={newActivite.description} onChange={handleInputChange} placeholder="Description de l'activité" />
      <button onClick={handleCreateActivite}>Créer</button>
    </div>
  );
};

export default ActiviteComponent;

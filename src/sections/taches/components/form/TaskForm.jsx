import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import SelectField from 'src/components/form/SelectField';
import DateTimeField from 'src/components/form/DateTimeField';
import ActiviteComponent from 'src/components/form/ActiviteComponent';
import { statusOptions, priorityOptions } from 'src/components/form/options';


const TaskForm = ({ open, handleClose, onSave, task }) => {



  const [formData, setFormData] = useState({
    name: '',
    status: 'En attente',
    activite: [],
    priorite: 'Moyen',
    description: '',
    n_OS: '',
    date_debut: null,
    date_fin: null,
  });

  useEffect(() => {
    if (task) {
      // Si une tâche est fournie, remplir le formulaire avec les données de la tâche
      setFormData({
        name: task.name || '',
        activite: task.activite || [],
        status: task.status || 'En attente',
        priorite: task.priorite || 'Moyen',
        description: task.description || '',
        n_OS: task.n_OS || '',
        date_debut: task.date_debut || null,
        date_fin: task.date_fin || null,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name,value);
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}</DialogTitle>
      <DialogContent>
        <ActiviteComponent values={formData.activite} onChange={handleChange} />
        <TextField
          fullWidth
          label="Nom de la tâche"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <SelectField 
        name="status" 
        label="status" 
        value={formData.status}
        options={statusOptions} 
        onChange={handleChange}
        optionsType="status"
        helperText="Sélectionnez un statut"
        />
        <SelectField
         label="Priorité"
         name="priority"
         value={formData.priorite}
         onChange={handleChange}
         options={priorityOptions}
         optionsType="priority"
         helperText="Sélectionnez une priorité"
      />
        
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Numéro d'OS"
          name="n_OS"
          value={formData.n_OS}
          onChange={handleChange}
        />
        
        <DateTimeField 
        label="Date de fin"
        name="date_fin"
        value={formData.date_fin}
        onChange={handleChange}
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  task: PropTypes.object, // Si vous fournissez une tâche, le formulaire sera pré-rempli pour la modification
};

export default TaskForm;

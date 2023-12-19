import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TaskSort = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const sortOptions = ['Catégorie', 'Activité', 'Statut', 'Priorité'];

  // eslint-disable-next-line no-shadow
  const filterOptionsBySort = (sortOption) => {
    switch (sortOption) {
      case 'Catégorie':
        return ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'];
      case 'Activité':
        return ['Activité 1', 'Activité 2', 'Activité 3'];
      case 'Statut':
        return ['En attente', 'En cours', 'En arrêt', 'Effectué'];
      case 'Priorité':
        return ['Bas', 'Moyen', 'Élevé'];
      default:
        return [];
    }
  };

  useEffect(() => {
    setFilterOptions(filterOptionsBySort(sortOption));
    setSelectedFilter('');
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onSortChange(sortOption, e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-by-label">Trier par</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        value={sortOption}
        label="Trier par"
        onChange={handleSortChange}
      >
        <MenuItem value="">Sélectionnez un type de tri</MenuItem>
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      {sortOption && (
        <FormControl fullWidth style={{ marginTop: '16px' }}>
          <InputLabel id="filter-by-label">Filtrer par {sortOption}</InputLabel>
          <Select
            labelId="filter-by-label"
            id="filter-by"
            value={selectedFilter}
            label={`Filtrer par ${sortOption}`}
            onChange={handleFilterChange}
          >
            <MenuItem value="">Sélectionnez une option</MenuItem>
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </FormControl>
  );
};

TaskSort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default TaskSort;

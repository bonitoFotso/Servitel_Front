import PropTypes from 'prop-types';

import { TextField, FormControl } from '@mui/material';

const DateTimeField = ({ label, name, value, onChange, error, helperText, required, margin, errorStyle }) => {
  // Assurez-vous que la valeur est une chaîne vide si elle est nulle
  const sanitizedValue = value || '';

  return (
    <FormControl fullWidth style={{ margin }}>
      <TextField
        variant="standard"
        label={label}
        id={name}
        name={name}
        type="datetime-local"
        value={sanitizedValue}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error && helperText}
        required={required}
        style={error && errorStyle}
      />
    </FormControl>
  );
};

DateTimeField.propTypes = {
  error: PropTypes.func,
  helperText: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  required: PropTypes.bool,
  margin: PropTypes.string,
  errorStyle: PropTypes.object,
};

export default DateTimeField;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { TextField, Button, Box, Typography } from '@mui/material';

function Signup(props) {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [clickedInputs, setClickedInputs] = useState({});
  const [addUser] = useMutation(ADD_USER);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!formState.firstName) newErrors.firstName = 'First name is required';
    if (!formState.lastName) newErrors.lastName = 'Last name is required';
    if (!formState.email.includes('@')) newErrors.email = 'Email is invalid';
    if (formState.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleInputClick = (name) => {
    setClickedInputs(prevState => ({
      ...prevState,
      [name]: true,
    }));
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting:", formState);

    if (!validateForm()) return;

    try {
      const mutationResponse = await addUser({
        variables: {
          input: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            password: formState.password,
          },
        },
      });

      if (mutationResponse && mutationResponse.data.addUser.token) {
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
        navigate('/profile'); // Redirect after successful signup
      }
    } catch (error) {
      console.error("Error in mutation:", error);
      setErrors({ ...errors, mutation: 'Failed to register. Please try again.' });
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="h4" component="h3" gutterBottom>
        Signup
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
        {/* Input fields */}
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          multiline
          rows={2}
          value={formState.firstName}
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          multiline
          rows={2}
          value={formState.lastName}
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          multiline
          rows={2}
          value={formState.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          multiline
          rows={2}
          value={formState.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
        {/* Error message */}
        {errors.mutation && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.mutation}
          </Typography>
        )}
      </Box>
      <Link to="/login" style={{ marginTop: '1rem' }}>← Go to Login</Link>
    </Box>
  );
}

export default Signup;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { TextField, Button, Box, Typography } from '@mui/material';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      navigate('/assignments');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="h4" component="h3" gutterBottom>
        Login
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            The provided credentials are incorrect
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
      <Link to="/signup" style={{ marginTop: '1rem' }}>← Go to Signup</Link>
    </Box>
  );
}

export default Login;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      
    }
  };

  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
    <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 2
        }}>
      <Card sx={{  maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Log In
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography>Email:</Typography>
            <TextField 
              fullWidth
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email || ""}
              margin="dense"
              autoComplete="email"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography>Password:</Typography>
            <TextField 
              fullWidth
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password || ""}
              margin="dense"
              autoComplete="current-password"
            />
          </Box>

          {submitted && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Login successful! Redirecting...
            </Alert>
          )}
        </CardContent>

        <CardActions sx={{ padding: 2 }}>
          <Button 
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={submitted}
          >
            Log In
          </Button>
        </CardActions>
      </Card>
    </Box>
    </Box>
  );
};

export default Login;

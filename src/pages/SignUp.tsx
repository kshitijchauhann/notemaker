import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Check password strength
  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    
    // Length check
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(pass)) score += 20; // Uppercase
    if (/[a-z]/.test(pass)) score += 10; // Lowercase
    if (/[0-9]/.test(pass)) score += 20; // Numbers
    if (/[^A-Za-z0-9]/.test(pass)) score += 20; // Special chars
    
    return score;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const getStrengthLabel = (strength) => {
    if (strength === 0) return "No password";
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    return "Strong";
  };

  const getStrengthColor = (strength) => {
    if (strength < 40) return "error";
    if (strength < 70) return "warning";
    return "success";
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sign Up
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography>Name:</Typography>
            <TextField 
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name || ""}
              margin="dense"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography>Password:</Typography>
            <TextField 
              fullWidth
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password || ""}
              margin="dense"
              autoComplete="new-password"
            />
            {password && (
              <>
                <LinearProgress 
                  variant="determinate" 
                  value={passwordStrength} 
                  color={getStrengthColor(passwordStrength)}
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption">
                  Password strength: {getStrengthLabel(passwordStrength)}
                </Typography>
              </>
            )}
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography>Confirm Password:</Typography>
            <TextField 
              fullWidth
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword || ""}
              margin="dense"
              autoComplete="new-password"
            />
          </Box>
          
          {submitted && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Sign-up successful! Redirecting...
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
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SignUp;

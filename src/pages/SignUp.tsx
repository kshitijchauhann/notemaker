import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Logo from "../logoipsum-custom-logo (2).svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 10;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[a-z]/.test(pass)) score += 10;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;
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
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = {
        name,
        email,
        password,
      };
      const response = await axios.post('http://localhost:3000/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setSubmitted(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 2
  }}>
    <Box sx={{ mb: 3 }}>
      <img width="200px" src={Logo} alt="Logo"/>
    </Box>
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
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
              <Typography>Email:</Typography>
              <TextField
                fullWidth
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
    </Box>
  );
};

export default SignUp;

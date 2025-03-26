import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        position: 'relative' 
      }}
    >
      <Box>
      <Button onClick={toggleDrawer(true)}><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250, padding: 2 }}>
      <Typography variant="h6">Drawer Content</Typography>
      <Button onClick={toggleDrawer(false)}>Close</Button>
      </Box></Drawer>
    </Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexGrow: 1 
        }}
      >
        <Typography 
          variant="h1" 
          component="h2" 
          sx={{ 
            textAlign: 'center' 
          }}
        >
          Let's make notes!
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          width: '100%', 
          padding: 2,
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: 0,
          left: 0 
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from "@mui/material/InputAdornment";

const Dashboard = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setisDrawerOpen(newOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      {/* Drawer */}
      <Box>
        <Button onClick={toggleDrawer(true)}>
          <KeyboardArrowRightIcon />
        </Button>
        <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, padding: 2 }}>
            <Typography variant="h6">Drawer Content</Typography>
            <Button onClick={toggleDrawer(false)}>Close</Button>
          </Box>
        </Drawer>
      </Box>

      {/* Main Title */}
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
          sx={{ textAlign: 'center' }}
        >
          Let's make notes!
        </Typography>
      </Box>
      
      {/* Input Field with Add Button */}
      <Box 
        sx={{ 
          width: '100%', 
          height: '10%',
          padding: 2,
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: 0,
          left: 0 
        }}
      >
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
             
                  <Fab 
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  color="primary" 
                  size="small" 
                  aria-label="add"
                  component="label"
                  >
  
                    <AddIcon />

              <input type="file" accept="application/pdf" hidden />
                  </Fab>
              </InputAdornment>
            ),
          }}
        />
           </Box>
      </Box>
  );
};

export default Dashboard;

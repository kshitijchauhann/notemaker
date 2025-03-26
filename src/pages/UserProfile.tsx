import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import GoogleIcon from '@mui/icons-material/Google';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
const Profile = () => {

  const [openProfile, setOpenProfile ] = useState(true);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleSecurity = () => {
    setOpenSecurity(true)
  }
  const editProfile = () => {
    setOpenEdit(true);
  }
  return (
    <Box 
      sx={{ 
        display: "flex", 
        height: "100vh", 
        width: "100vw",
        overflow: "hidden"
      }}
    >
      <Box 
        sx={{ 
          width: '30%', 
          bgcolor: 'grey.300', 
          display: "flex", 
          alignItems: "flex-start", 
          p: 2 
        }}
      >
      <Stack spacing={2} direction="column" sx={{ width: "100%" }}>

        <Typography variant="h4">Account</Typography>
        <Typography>Manage your account info.</Typography>

        <Button variant="text" fullWidth startIcon={<AccountBoxIcon />} sx={{ justifyContent: "flex-start", textAlign: "left", pl: 2 }}><Typography>Profile</Typography></Button>
        <Button variant="text" fullWidth startIcon={<LockIcon />} onClick={handleSecurity} sx={{ justifyContent: "flex-start", textAlign: "left", pl: 2 }}><Typography>Security</Typography></Button>
      </Stack>
      </Box>
      <Box 
        sx={{ 
          width: '70%', 
          bgcolor: 'grey.100', 
          display: "flex", 
          alignItems: "flex-start", 
          justifyContent: "center",
          p: 2 
        }}
      >
        <Box sx={{ width: "100%" , alignItems: "flex-start" }}>

        <Typography variant="h3" sx={{ justifyContent: "flex-end", textAlign: "left", p: 2}} >Profile details</Typography>
            <Divider/>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography>Profile</Typography>
        </Grid> 
        <Grid item xs={7}>
          <Stack direction="row" alignItems="center">
          <Avatar alt="Remy Sharp" src="" sx={{ width: 50, height: 50, cursor: "pointer"}}/>
          <Typography sx={{ pl: 1}}>Patrick Bet</Typography></Stack> 
        </Grid>
        <Grid item xs={2}>
          <Button 
            startIcon={<EditIcon/>}
            onClick={editProfile}
          >
          edit profile</Button>
        </Grid>
      </Grid>
<Divider/>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography>Email adresses</Typography>
        </Grid> 
        <Grid item xs={9}>
          <Typography> kay@gmail.com</Typography>
        </Grid>
        </Grid>
<Divider/>
       <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography>Connected account</Typography>
        </Grid> 
        <Grid item xs={9}>
          <Typography sx={{ display: "flex", alignItems: "center" }}><GoogleIcon sx={{pr: 1}}></GoogleIcon>kay@gmail.com</Typography>
        </Grid>
        </Grid>



<Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
  <DialogTitle>Edit Profile</DialogTitle>
  <DialogContent>
    <DialogContentText>Change Name:</DialogContentText>
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="changeName"
      label="Name"
      type="text"
      fullWidth
      variant="standard"
    />
  </DialogContent>
  <DialogContent>
    <DialogContentText>Change Email:</DialogContentText>
    <TextField
      required
      margin="dense"
      id="email"
      name="changeEmail"
      label="Email"
      type="email"
      fullWidth
      variant="standard"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
    <Button type="submit">Submit</Button>
  </DialogActions>
</Dialog>
        </Box>

        <Box 
          open={openSecurity}
          sx={{ 
          width: '70%', 
          bgcolor: 'grey.100', 
          display: "flex", 
          alignItems: "flex-start", 
          justifyContent: "center",
          p: 2 
        }}
      >

          </Box>
      </Box>
    </Box>
  )
}

export default Profile;

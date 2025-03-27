import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Divider,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Switch
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import GoogleIcon from "@mui/icons-material/Google";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Single state for tabs
  const [openEdit, setOpenEdit] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Patrick Bet",
    email: "kay@gmail.com",
  });

  // Handle form change
  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box sx={{ width: "30%", bgcolor: "grey.300", p: 2 }}>
        <Stack spacing={2} direction="column">
          <Typography variant="h4">Account</Typography>
          <Typography>Manage your account info.</Typography>

          {/* Tabs with onClick handler */}
          <Button
            variant={activeTab === "profile" ? "contained" : "text"}
            fullWidth
            startIcon={<AccountBoxIcon />}
            sx={{ justifyContent: "flex-start", textAlign: "left", pl: 2 }}
            onClick={() => setActiveTab("profile")}
          >
            <Typography>Profile</Typography>
          </Button>

          <Button
            variant={activeTab === "security" ? "contained" : "text"}
            fullWidth
            startIcon={<LockIcon />}
            sx={{ justifyContent: "flex-start", textAlign: "left", pl: 2 }}
            onClick={() => setActiveTab("security")}
          >
            <Typography>Security</Typography>
          </Button>
        </Stack>
      </Box>

      {/* Content Area */}
      <Box sx={{ width: "70%", bgcolor: "grey.100", p: 3 }}>
        {activeTab === "profile" && (
          <>
            <Typography variant="h3" sx={{ textAlign: "left", p: 2 }}>
              Profile Details
            </Typography>
            <Divider />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography>Profile</Typography>
              </Grid>
              <Grid item xs={7}>
                <Stack direction="row" alignItems="center">
                  <Avatar alt="Profile Picture" src="" sx={{ width: 50, height: 50, cursor: "pointer" }} />
                  <Typography sx={{ pl: 1 }}>{profileData.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Button startIcon={<EditIcon />} onClick={() => setOpenEdit(true)}>
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography>Email Address</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{profileData.email}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography>Connected Account</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <GoogleIcon sx={{ pr: 1 }} />
                  {profileData.email}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {activeTab === "security" && (
          <>
            <Typography variant="h3" sx={{ textAlign: "left", p: 2 }}>
              Security Settings
            </Typography>
            <Divider />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography>Change Password</Typography>
              </Grid>
              <Grid item xs={9}>
                <Button variant="contained" color="primary" onClick={() => setOpenPasswordDialog(true)}>
                  Change Password
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography>Enable Two-Factor Authentication</Typography>
              </Grid>
              <Grid item xs={9}>
                <Switch />
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Change Name:</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Change Email:</DialogContentText>
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={() => setOpenEdit(false)}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your new password below:</DialogContentText>
          <TextField
            required
            margin="dense"
            id="current-password"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="new-password"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="confirm-password"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenPasswordDialog(false)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;

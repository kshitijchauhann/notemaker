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
  Switch,
  Paper
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import GoogleIcon from "@mui/icons-material/Google";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
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
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        gap: 2,
        p: 2,
        bgcolor: "background.default"
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: "100%", md: "30%" },
          p: 3,
          borderRadius: 2,
          bgcolor: "grey.100"
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account info.
          </Typography>

          {/* Tabs with onClick handler */}
          <Button
            variant={activeTab === "profile" ? "contained" : "outlined"}
            fullWidth
            startIcon={<AccountBoxIcon />}
            sx={{
              justifyContent: "flex-start",
              textAlign: "left",
              pl: 2,
              borderRadius: 2,
              "&:hover": { boxShadow: 3 }
            }}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </Button>

          <Button
            variant={activeTab === "security" ? "contained" : "outlined"}
            fullWidth
            startIcon={<LockIcon />}
            sx={{
              justifyContent: "flex-start",
              textAlign: "left",
              pl: 2,
              borderRadius: 2,
              "&:hover": { boxShadow: 3 }
            }}
            onClick={() => setActiveTab("security")}
          >
            Security
          </Button>
        </Stack>
      </Paper>

      {/* Content Area */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
          overflowY: "auto"
        }}
      >
        {activeTab === "profile" && (
          <>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Profile Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Profile Picture
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    alt="Profile Picture"
                    src=""
                    sx={{
                      width: 70,
                      height: 70,
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.1)" }
                    }}
                  />
                  <Typography variant="h6">{profileData.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => setOpenEdit(true)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": { boxShadow: 2 }
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email Address
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="body1">{profileData.email}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Connected Account
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <GoogleIcon color="primary" />
                  <Typography variant="body1">{profileData.email}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}

        {activeTab === "security" && (
          <>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Security Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Change Password
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenPasswordDialog(true)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": { boxShadow: 2 }
                  }}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Two-Factor Authentication
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Switch />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <DialogContentText>Change your name and email address below:</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={profileData.name}
            onChange={handleInputChange}
            sx={{ my: 1 }}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={profileData.email}
            onChange={handleInputChange}
            sx={{ my: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={() => setOpenEdit(false)} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <DialogContentText>
            Enter your current password and new password below:
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="current-password"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ my: 1 }}
          />
          <TextField
            required
            margin="dense"
            id="new-password"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ my: 1 }}
          />
          <TextField
            required
            margin="dense"
            id="confirm-password"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ my: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenPasswordDialog(false)} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;

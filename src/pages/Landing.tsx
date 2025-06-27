import React, { useState } from 'react';
import { 
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Menu as MenuIcon,
  YouTube as YouTubeIcon,
  PictureAsPdf as PdfIcon,
  Summarize as SummarizeIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import Logo from "../logoipsum-custom-logo (2).svg";

import { useNavigate } from 'react-router-dom';

const AINoteMakerLanding = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleSignupClick = () => {
    navigate("/signup");
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', width:'100vw' }}>
      {/* Navigation */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <img width="200px" src={Logo}/>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" href="#features">Features</Button>

            <Button 
              color="primary" 
              variant="contained" 
              sx={{ ml: 2, borderRadius: 28 }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              sx={{ ml: 2, borderRadius: 28 }}
              onClick={handleSignupClick}
            >
              Sign Up Free
            </Button>
          </Box>
          <IconButton 
            sx={{ display: { xs: 'flex', md: 'none' } }} 
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
                        <ListItem sx={{ pt: 2 }}>

            <Button 
              color="primary" 
              variant="contained" 
              fullWidth 
              sx={{ borderRadius: 28 }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
              </ListItem>
            <ListItem sx={{ pt: 2 }}>

              <Button 
                color="primary" 
                variant="contained" 
                fullWidth sx={{ borderRadius: 28 }}
                onClick={handleSignupClick}
              >
                Sign Up Free
              </Button>
            </ListItem>
            
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ width: '100%', backgroundColor: '#FAFAFA', pt: 8, pb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Take Notes with the Power of <Box component="span" sx={{ color: '#6366F1' }}>AI</Box>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Transform your note-taking experience with our AI-powered app that summarizes content and creates notes from PDFs and YouTube videos.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ borderRadius: 28, px: 3, py: 1, backgroundColor: '#6366F1' }}
                  onClick={handleSignupClick}
                >
                  Get Started
                </Button>
                              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*E1-9a1V5YJlXbS35"
                alt="NoteGenius App Interface"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ width: '100%', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" fontWeight="bold" sx={{ mb: 2 }}>
            Smart Features
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
            Our AI-powered tools extract information from multiple sources
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  <SummarizeIcon sx={{ fontSize: 50, color: '#6366F1', mb: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    AI Summarization
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get concise summaries of long documents, articles, and meetings with our advanced AI.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  <PdfIcon sx={{ fontSize: 50, color: '#6366F1', mb: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    PDF Note Creation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload any PDF and our AI will extract key information and create structured notes.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  <YouTubeIcon sx={{ fontSize: 50, color: '#6366F1', mb: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    YouTube to Notes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Paste any YouTube URL and get comprehensive notes from video content automatically.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: '#FAFAFA', py: 8, width: '100%' }}>
        <Container maxWidth="md">
          <Card sx={{ 
            p: 4, 
            borderRadius: 4,
            boxShadow: 3,
            textAlign: 'center'
          }}>
            <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              Start creating better notes today
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Sign up for free and transform how you capture information.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{ borderRadius: 28, px: 4, py: 1.5, backgroundColor: '#6366F1' }}
              onClick={handleSignupClick}
            >
              Sign Up Free
            </Button>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1F2937', color: 'white', py: 4, width: '100%' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <AutoAwesomeIcon sx={{ mr: 1 }} />
              NoteGenius
            </Typography>
            <Typography variant="body2" color="gray.400">
              © 2025 NoteGenius, Inc. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AINoteMakerLanding;

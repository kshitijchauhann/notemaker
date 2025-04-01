import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from "@mui/material/InputAdornment";
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Forward';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const NoteArea = () => {
  // State for UI controls
  const [checked, setChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // State for form data and API communication
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [linkText, setLinkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for notes display
  const [notes, setNotes] = useState<string[]>([]);
  const [showNotesScreen, setShowNotesScreen] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsDrawerOpen(newOpen);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPdfFile(file);
      setFileName(file.name);
    }
  };
  
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkText(event.target.value);
  };
  
  const handleSubmitPdf = async () => {
    if (!pdfFile) {
      setError('Please select a PDF file');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data && response.data.notes) {
        setNotes([response.data.notes]);
        setShowNotesScreen(true);
      }
    } catch (err) {
      console.error('Error uploading PDF:', err);
      setError('Failed to upload PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmitLink = async () => {
    if (!linkText.trim()) {
      setError('Please enter a link');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://your-backend-url/api/process-link', {
        url: linkText
      });
      
      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
        setShowNotesScreen(true);
      }
    } catch (err) {
      console.error('Error processing link:', err);
      setError('Failed to process link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const closeNotesScreen = () => {
    setShowNotesScreen(false);
    setPdfFile(null);
    setFileName('');
    setLinkText('');
  };
  
  // Notes screen that appears after submission
  const NotesScreen = () => (
    <Box sx={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      bgcolor: 'background.paper',
      zIndex: 10,
      p: 3,
      overflow: 'auto'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          Notes from {checked ? 'Link' : fileName}
        </Typography>
        <IconButton onClick={closeNotesScreen}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      {notes.length > 0 ? (
        <Box>
          {notes.map((note, index) => (
            <Card key={index} sx={{ mb: 2, p: 2 }}>
              <Typography variant="body1">{note}</Typography>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>No notes were generated. Please try again.</Typography>
      )}
      
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }}
        onClick={closeNotesScreen}
      >
        Back to Upload
      </Button>
    </Box>
  );
 
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
      {/* Notes Screen - Shown after submission */}
      {showNotesScreen && <NotesScreen />}
      
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
      
      {/* Main Content */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexGrow: 1 
        }}
      >
        <Paper elevation={3} sx={{width: '50%', height: 'auto', padding: 2}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>
              {checked ? 'Link Mode' : 'PDF Mode'}
            </Typography>
            <Switch 
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled'}}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'red',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'red',
                } 
              }} 
            />
          </Box>
          
          {/* Error message */}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          {/* PDF Upload Card */}
          {!checked && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Upload PDF</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Fab 
                    color="primary" 
                    size="small" 
                    aria-label="add"
                    component="label"
                    sx={{ mr: 2 }}
                  >
                    <AddIcon />
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      hidden 
                      onChange={handleFileChange}
                    />
                  </Fab>
                  <Typography>
                    {fileName ? fileName : 'No file selected'}
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  onClick={handleSubmitPdf} 
                  disabled={!pdfFile || isLoading}
                  fullWidth
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Upload and Generate Notes'}
                </Button>
              </CardContent> 
            </Card>
          )}
          
          {/* Link Input Card */}
          {checked && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Enter URL</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Paste your link here..."
                  value={linkText}
                  onChange={handleLinkChange}
                  disabled={isLoading}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
                  onClick={handleSubmitLink}
                  disabled={!linkText.trim() || isLoading}
                  fullWidth
                >
                  Process Link
                </Button>
              </CardContent>
            </Card>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default NoteArea;

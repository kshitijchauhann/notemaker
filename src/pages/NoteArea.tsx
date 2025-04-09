import React, { useState } from 'react';
import {
  Box, TextField, Button, Fab, Paper, Switch, Typography,
  Card, CardContent, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Forward';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// NotesScreen component
const NotesScreen = ({
  notes,
  fileName,
  checked,
  closeNotesScreen,
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100vh',
      bgcolor: 'background.paper',
      zIndex: 1300,
      p: { xs: 2, sm: 3 },
      overflowY: 'auto',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
      width: '100%',
      maxWidth: 900,
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          wordBreak: 'break-word',  
          overflowWrap: 'anywhere',
          pr: 2,
          maxWidth: 'calc(100% - 48px)'
        }}
      >
        Notes from {checked ? 'Link' : fileName}
      </Typography>
      <IconButton onClick={closeNotesScreen}>
        <CloseIcon />
      </IconButton>
    </Box>

    {notes.length > 0 ? (
      <Card sx={{ width: '100%', maxWidth: 900, overflow: 'hidden', wordBreak: 'break-word' }}>
        <CardContent sx={{ px: { xs: 2, sm: 3 } }}>
          {notes[0].split('\n').map((line, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ mb: 2, wordBreak: 'break-word' }}>
              {line.trim()}
            </Typography>     
            ))}
        </CardContent>
      </Card>
    ) : (
      <Typography>No notes were generated. Please try again.</Typography>
    )}

    <Button variant="contained" sx={{ mt: 4, mb: 4 }} onClick={closeNotesScreen}>
      Back to Upload
    </Button>
  </Box>
);

const NoteArea = () => {
  const [checked, setChecked] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [linkText, setLinkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [showNotesScreen, setShowNotesScreen] = useState(false);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.notes) {
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
      const response = await axios.post('http://localhost:5000/api/process-link', {
        url: linkText,
      });

      if (response.data?.notes) {
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >

<Box sx={{ position: 'absolute', top: 16, right: 16 }}>
  <Tooltip title="Go to Profile">
    <IconButton onClick={() => navigate('/profile')}>
      <Avatar
        alt="Profile"
        src="/path/to/profile-pic.jpg" 
        sx={{ width: 40, height: 40 }}
      />
    </IconButton>
  </Tooltip>
</Box>
      {showNotesScreen ? (
        <NotesScreen
          notes={notes}
          fileName={fileName}
          checked={checked}
          closeNotesScreen={closeNotesScreen}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            px: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
              maxWidth: 700,
              mx: 'auto',
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, alignItems: 'center' }}>
              <Typography sx={{ mr: 1 }}>{checked ? 'Link Mode' : 'PDF Mode'}</Typography>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: 'red' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'red',
                  },
                }}
              />
            </Box>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {!checked ? (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Upload PDF
                  </Typography>
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
                    <Typography>{fileName || 'No file selected'}</Typography>
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
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Enter URL (Only English Video)
                  </Typography>
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
      )}
    </Box>
  );
};

export default NoteArea;

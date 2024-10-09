import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Grid2,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, Delete, Edit, Save, Cancel } from "@mui/icons-material";
import AppBar from "./components/AppBar";
import { styled } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
  backgroundColor: theme.palette.primary.main,
  input: { color: theme.palette.text.primary },
  label: { color: theme.palette.text.primary },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.primary.light}`,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#202b3b',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#2c3e50',
  },
}));

const SettingsPage = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editKey, setEditKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/settings', { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      console.log('Fetched settings:', data);
      const settingsArray = Object.entries(data).map(([key, value]) => ({ key, value }));
      setSettings(settingsArray);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error("Failed to fetch settings. Please try again.");
    }
  };

  const handleAdd = async () => {
    if (newKey && newValue) {
      try {
        const response = await fetch('/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: newKey, value: newValue }),
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to add setting');
        }
        setSettings([...settings, { key: newKey, value: newValue }]);
        setNewKey('');
        setNewValue('');
        toast.success("Setting added successfully");
      } catch (err) {
        console.error('Error adding entry:', err);
        toast.error("Failed to add setting. Please try again.");
      }
    }
  };

  const handleDelete = async (keyToDelete) => {
    try {
      const response = await fetch(`/settings/${keyToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete setting');
      }
      setSettings(settings.filter(setting => setting.key !== keyToDelete));
      toast.success("Setting deleted successfully");
    } catch (err) {
      console.error('Error deleting entry:', err);
      toast.error("Failed to delete setting. Please try again.");
    }
  };

  const handleEdit = (key, value) => {
    setEditKey(key);
    setEditValue(value);
  };

  const handleSave = async (key) => {
    try {
      const response = await fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value: editValue }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update setting');
      }
      setSettings(settings.map(setting => 
        setting.key === key ? { key, value: editValue } : setting
      ));
      setEditKey(null);
      toast.success("Setting updated successfully");
    } catch (err) {
      console.error('Error updating entry:', err);
      toast.error("Failed to update setting. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditKey(null);
  };

  if (loading) return <Typography color="text.primary">Loading...</Typography>;
  if (error) return <Typography color="error">Error loading settings: {error.message}</Typography>;

  return (
    <Grid2 container>
      <AppBar />
      <Box sx={{ backgroundColor: theme.palette.primary.main, minHeight: '100vh', width: '100%' }}>
        <ToastContainer theme="dark" />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom color="text.primary">
            Settings
          </Typography>
          <Box mb={3} display="flex" alignItems="center">
            <StyledTextField
              label="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ mr: 2 }}
            />
            <StyledTextField
              label="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ mr: 2 }}
            />
            <StyledButton
              variant="contained"
              startIcon={<Add />}
              onClick={handleAdd}
            >
              Add
            </StyledButton>
          </Box>
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Key</StyledTableCell>
                  <StyledTableCell>Value</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settings.map((setting) => (
                  <TableRow key={setting.key}>
                    <StyledTableCell>{setting.key}</StyledTableCell>
                    <StyledTableCell>
                      {editKey === setting.key ? (
                        <StyledTextField
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        setting.value
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {editKey === setting.key ? (
                        <>
                          <StyledIconButton onClick={() => handleSave(setting.key)}>
                            <Save />
                          </StyledIconButton>
                          <StyledIconButton onClick={handleCancel}>
                            <Cancel />
                          </StyledIconButton>
                        </>
                      ) : (
                        <>
                          <StyledIconButton onClick={() => handleEdit(setting.key, setting.value)}>
                            <Edit />
                          </StyledIconButton>
                          <StyledIconButton onClick={() => handleDelete(setting.key)}>
                            <Delete />
                          </StyledIconButton>
                        </>
                      )}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Container>
      </Box>
    </Grid2>
  );
};

export default SettingsPage;
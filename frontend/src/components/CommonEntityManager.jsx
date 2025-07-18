import {
    Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
    DialogTitle, IconButton, MenuItem, Select, Stack, Table, TableBody,
    TableCell, TableHead, TableRow, TextField, Typography
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { Delete, Edit } from '@mui/icons-material';
  import api from '../config/axios';
  
  const CommonEntityManager = ({ title, fields, serviceBasePath }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({});
  
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await api.get(serviceBasePath);
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const resetForm = () => {
      const reset = {};
      fields.forEach(f => (reset[f.name] = f.type === 'select' ? f.options[0] : ''));
      setForm(reset);
      setIsEditing(false);
      setEditId(null);
    };
  
    const handleSubmit = async () => {
      const apiFn = isEditing ? api.put : api.post;
      const path = isEditing ? `${serviceBasePath}/${editId}` : serviceBasePath;
      await apiFn(path, form);
      setOpenDialog(false);
      resetForm();
      fetchItems();
    };
  
    const handleEdit = (item) => {
      const filled = {};
      fields.forEach(f => (filled[f.name] = item[f.name] || (f.type === 'select' ? f.options[0] : '')));
      setForm(filled);
      setEditId(item.id);
      setIsEditing(true);
      setOpenDialog(true);
    };
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await api.delete(`${serviceBasePath}/${id}`);
        fetchItems();
      }
    };
  
    return (
      <Box p={3}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">{title}</Typography>
          <Button variant="contained" onClick={() => { setOpenDialog(true); resetForm(); }}>
            Add {title.slice(0, -1)}
          </Button>
        </Stack>
  
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {fields.map(f => (
                  <TableCell key={f.name}>{f.label}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  {fields.map(f => (
                    <TableCell key={f.name}>{item[f.name]}</TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)} size="small" color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
  
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{isEditing ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              {fields.map(f => f.type === 'select' ? (
                <Select
                  key={f.name}
                  value={form[f.name] || f.options[0]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  fullWidth
                >
                  {f.options.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  key={f.name}
                  label={f.label}
                  value={form[f.name] || ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  fullWidth
                />
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default CommonEntityManager;
  
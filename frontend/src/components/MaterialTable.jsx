import {
    Box, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, IconButton, Stack, Table, TableBody,
    TableCell, TableHead, TableRow, TextField, Typography
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from '../services/materialService';
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  
  const MaterialTable = () => {
    const [materials, setMaterials] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [form, setForm] = useState({ name: '' });
    const [editId, setEditId] = useState(null);
  
    const fetchMaterials = async () => {
      const res = await getMaterials();
      setMaterials(res.data);
    };
  
    useEffect(() => {
      fetchMaterials();
    }, []);
  
    const handleSave = async () => {
      if (editId) {
        await updateMaterial(editId, form);
      } else {
        await createMaterial(form);
      }
      setOpenDialog(false);
      setEditId(null);
      setForm({ name: '' });
      fetchMaterials();
    };
  
    const handleEdit = (item) => {
      setForm({ name: item.name });
      setEditId(item.id);
      setOpenDialog(true);
    };
  
    const handleDelete = async (id) => {
      if (confirm('Are you sure to delete?')) {
        await deleteMaterial(id);
        fetchMaterials();
      }
    };
  
    return (
      <Box p={3}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Materials</Typography>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>Add Material</Button>
        </Stack>
  
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((mat) => (
              <TableRow key={mat.id}>
                <TableCell>{mat.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(mat)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(mat.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{editId ? 'Edit Material' : 'Add Material'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              margin="dense"
              value={form.name}
              onChange={(e) => setForm({ name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default MaterialTable;
  
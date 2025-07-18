import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton, MenuItem, Select, Stack, Table, TableBody,
  TableCell, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createNewProduct, updateExistingProduct, deleteExistingProduct } from '../store/productSlice';
import { Edit, Delete } from '@mui/icons-material';

const statusOptions = ['Active', 'Inactive', 'Archived'];

const Product = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: '', code: '', description: '', status: 'Active'
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (isEditing) {
      await dispatch(updateExistingProduct({ id: editId, data: form }));
    } else {
      await dispatch(createNewProduct(form));
    }
    handleClose();
    dispatch(fetchProducts());
  };

  const handleEdit = (prod) => {
    setForm(prod);
    setEditId(prod.id);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await dispatch(deleteExistingProduct(id));
      dispatch(fetchProducts());
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setForm({ name: '', code: '', description: '', status: 'Active' });
    setIsEditing(false);
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Products</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Add Product</Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>{prod.name}</TableCell>
                <TableCell>{prod.code}</TableCell>
                <TableCell>{prod.description || '-'}</TableCell>
                <TableCell>{prod.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(prod)} size="small"><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(prod.id)} size="small" color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Code" fullWidth value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            <TextField label="Description" fullWidth multiline minRows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Select fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {statusOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{isEditing ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;

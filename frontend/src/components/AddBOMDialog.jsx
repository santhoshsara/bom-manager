import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBOM, fetchBOMs } from '../store/bomSlice';
import { fetchProducts } from '../store/productSlice';

const AddBOMDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const [form, setForm] = useState({
    name: '',
    revision: '',
    effectiveFrom: '',
     productId: ''
  });
 useEffect(() => {
    dispatch(fetchProducts()); // ✅ Load products when dialog opens
  }, [dispatch]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let formPayload = {...form,  effectiveFrom: new Date(form.effectiveFrom),
      revision:parseInt(form.revision)
    }
    await dispatch(createNewBOM({ ...formPayload,form }));
    dispatch(fetchBOMs());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add BOM</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Revision"
          name="revision"
          value={form.revision}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="effectiveFrom"
          label="Effective From"
          InputLabelProps={{ shrink: true }}
          value={form.effectiveFrom}
          onChange={handleChange}
        />
              <FormControl fullWidth margin="normal">
          <InputLabel id="product-label">Product</InputLabel>
          <Select
            labelId="product-label"
            name="productId"
            value={form.productId}
            onChange={handleChange}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBOMDialog;

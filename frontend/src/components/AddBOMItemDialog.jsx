import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createNewBOMItem, fetchBOMItems } from '../store/bomSlice';

const AddBOMItemDialog = ({ open, onClose, bomId }) => {
  const dispatch = useDispatch();

  const { items: materials } = useSelector((state) => state.materials);
  const { items: units } = useSelector((state) => state.units);
  const { items: suppliers } = useSelector((state) => state.suppliers);

  const [form, setForm] = useState({
    materialId: '',
    unitId: '',
    quantity: '',
    referenceCode: '',
    supplierId: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let formPayload = { ...form, quantity: parseFloat(form.quantity) };
    await dispatch(createNewBOMItem({ ...formPayload, bomId }));
    dispatch(fetchBOMItems());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add BOM Item</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Material"
          name="materialId"
          value={form.materialId}
          onChange={handleChange}
        >
          {materials.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Unit"
          name="unitId"
          value={form.unitId}
          onChange={handleChange}
        >
          {units.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Reference Code"
          name="referenceCode"
          value={form.referenceCode}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Supplier"
          name="supplierId"
          value={form.supplierId}
          onChange={handleChange}
        >
          {suppliers.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBOMItemDialog;

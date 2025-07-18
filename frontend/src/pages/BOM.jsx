import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBOMs, fetchBOMItems } from "../store/bomSlice";
import { fetchMaterials } from "../store/materialSlice";
import { fetchUnits } from "../store/unitSlice";
import { fetchSuppliers } from "../store/supplierSlice";

import AddBOMDialog from "../components/AddBOMDialog";
import AddBOMItemDialog from "../components/AddBOMItemDialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BOM = () => {
  const dispatch = useDispatch();
  const { items: materials } = useSelector((state) => state.materials);
  const { items: units } = useSelector((state) => state.units);
  const { items: suppliers } = useSelector((state) => state.suppliers);

  const bomState = useSelector((state) => state.boms || {});
  const { items = [], bomItems = [], loading = false } = bomState;
  const [openAddBOM, setOpenAddBOM] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [selectedBOMId, setSelectedBOMId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const materialsMap = Object.fromEntries(materials.map((m) => [m.id, m.name]));
  const unitsMap = Object.fromEntries(units.map((u) => [u.id, u.name]));
  const suppliersMap = Object.fromEntries(suppliers.map((s) => [s.id, s.name]));

  useEffect(() => {
    dispatch(fetchBOMs());
    dispatch(fetchBOMItems());
    dispatch(fetchMaterials());
    dispatch(fetchUnits());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const getItemsForBOM = (bomId) =>
    bomItems.filter((item) => item.bomId === bomId);
  const toggleExpandRow = (id) =>
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Bill of Materials (BOM)</Typography>
        <Button variant="contained" onClick={() => setOpenAddBOM(true)}>
          Add BOM
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell width="25%">Name</TableCell>
                <TableCell>Revision</TableCell>
                <TableCell>Effective From</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((bom) => (
                <>
                  <TableRow key={bom.id}>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleExpandRow(bom.id)}
                      >
                        {expandedRows[bom.id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{bom.name}</TableCell>
                    <TableCell>{bom.revision}</TableCell>
                    <TableCell>
                      {new Date(bom.effectiveFrom).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedBOMId(bom.id);
                          setOpenAddItem(true);
                        }}
                      >
                        Add Item
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0, border: 0 }}>
                      <Collapse
                        in={expandedRows[bom.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box m={2}>
                          <Typography variant="subtitle1" gutterBottom>
                            BOM Items
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Material</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Reference Code</TableCell>
                                <TableCell>Supplier</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {getItemsForBOM(bom.id).map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    {materialsMap[item.materialId] ||
                                      item.materialId}
                                  </TableCell>
                                  <TableCell>
                                    {unitsMap[item.unitId] || item.unitId}
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>{item.referenceCode}</TableCell>
                                  <TableCell>
                                    {suppliersMap[item.supplierId] ||
                                      item.supplierId}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddBOMDialog
        open={openAddBOM}
        onClose={() => setOpenAddBOM(false)}
        onCreated={() => {
          dispatch(fetchBOMs());
        }}
      />

      <AddBOMItemDialog
        open={openAddItem}
        onClose={() => setOpenAddItem(false)}
        bomId={selectedBOMId}
        onCreated={() => {
          dispatch(fetchBOMItems());
        }}
      />
    </Box>
  );
};

export default BOM;

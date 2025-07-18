// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import BOM from './pages/BOM';
import Product from './pages/Product';
import Material from './pages/Material';
import Supplier from './pages/Supplier';
import Unit from './pages/Unit';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="products" element={<Product />} />
        <Route path="materials" element={<Material />} />
        <Route path="units" element={<Unit />} />
        <Route path="suppliers" element={<Supplier />} />
        <Route path="bom" element={<BOM />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

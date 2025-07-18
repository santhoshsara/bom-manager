import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommonEntityManager from '../components/CommonEntityManager';
import { fetchSuppliers } from '../store/supplierSlice';

const Supplier = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  return (
    <CommonEntityManager
      title="Suppliers"
      fields={[
        { name: 'name', label: 'Supplier Name', type: 'text', required: true },
        { name: 'code', label: 'Supplier Code', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'text' },
      ]}
      serviceBasePath="/supplier"
      data={items}
      loading={loading}
    />
  );
};

export default Supplier;

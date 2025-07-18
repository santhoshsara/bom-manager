import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommonEntityManager from '../components/CommonEntityManager';
import { fetchMaterials } from '../store/materialSlice';

const Material = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.materials);

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  return (
    <CommonEntityManager
      title="Materials"
      fields={[
        { name: 'name', label: 'Material Name', type: 'text', required: true },
        { name: 'code', label: 'Material Code', type: 'text', required: true },
        { name: 'type', label: 'Type', type: 'text' },
      ]}
      serviceBasePath="/material"
      data={items}
      loading={loading}
    />
  );
};

export default Material;

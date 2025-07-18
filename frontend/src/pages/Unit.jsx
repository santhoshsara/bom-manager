import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommonEntityManager from '../components/CommonEntityManager';
import { fetchUnits } from '../store/unitSlice';

const Unit = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.units);

  useEffect(() => {
    dispatch(fetchUnits());
  }, [dispatch]);

  return (
    <CommonEntityManager
      title="Units"
      fields={[
        { name: 'name', label: 'Unit Name', type: 'text', required: true },
        { name: 'shortName', label: 'Short Name', type: 'text', required: true },
      ]}
      serviceBasePath="/unit"
      data={items}
      loading={loading}
    />
  );
};

export default Unit;

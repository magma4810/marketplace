import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreApp } from '../store';
import { ProductModal } from '../components/ProductModal';
import { useSelector } from 'react-redux';

export const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = useSelector((store: StoreApp) => 
    store.products.products.find(p => p.id === Number(id))
  );

  const handleClose = () => {
    navigate('/'); 
  };

  if (!product) return <div>Loading...</div>;

  return (
    <ProductModal
      product={product}
      isOpen={true}
      onClose={handleClose}
    />
  );
};
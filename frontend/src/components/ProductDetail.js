import { jsx as _jsx } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { ProductModal } from '../components/ProductModal';
import { useSelector } from 'react-redux';
export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((store) => store.products.products.find(p => p.id === Number(id)));
    const handleClose = () => {
        navigate('/');
    };
    if (!product)
        return _jsx("div", { children: "Loading..." });
    return (_jsx(ProductModal, { product: product, isOpen: true, onClose: handleClose }));
};

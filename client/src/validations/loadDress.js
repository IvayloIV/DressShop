import { toast } from 'react-toastify';

export default function loadDressValidation(dress) {
    if (!dress) {
        toast.error('Product not found.');
        return false;
    }

    if (dress.isBought) {
        toast.error('Product was bought.');
        return false;
    }

    if (dress.userCart) {
        toast.error('Product is in user cart.');
        return false;
    }
    
    const isNotAdmin = localStorage.getItem('isAdmin') === 'false';
    const isNotOwner = dress.creator._id !== localStorage.getItem('userId');
    
    if (isNotAdmin && isNotOwner) {
        toast.error('You are not owner of product.');
        return false;
    }

    return true;
}

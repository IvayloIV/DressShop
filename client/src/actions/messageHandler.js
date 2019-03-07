import { toast } from 'react-toastify';

export default function showMessage(json) {
    if (json.success) {
        toast.success(json.message);
    } else if (json.errors){
        for (let error of json.errors) {
            toast.error(error);
        }
    } else {
        toast.error(json.message);
    }
}

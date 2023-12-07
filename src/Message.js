import { toast } from 'react-toastify';

export const Message = (text, type) => {
  switch (type) {
    case 'success':
      toast.success(text);
      break;
    case 'error':
      toast.error(text);
      break;
    case 'info':
      toast.info(text);
      break;
    case 'warning':
      toast.warning(text);
      break;
    default:
      toast(text);
  }
};

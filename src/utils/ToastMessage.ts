import { Bounce, toast, ToastPosition } from "react-toastify";

export const playToast = (
  type: "success" | "error" | "warning" | "info" | null,
  message: string,
) => {
  const option = {
    position: "top-right" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(message, option);
      break;
    case "error":
      toast.error(message, option);
      break;
    case "warning":
      toast.warn(message, option);
      break;
    case "info":
      toast.info(message, option);
      break;
    default:
      toast(message, option);
  }
};

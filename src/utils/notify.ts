import { toast, ToastPosition } from "react-toastify";

export function notify(message: string, type: string, theme: string) {
  theme = theme === "light" ? "light" : "dark";
  const toastOptions = {
    position: "bottom-right" as ToastPosition,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: theme,
  };

  if (type === "success") {
    toast.success(message, toastOptions);
  } else if (type === "error") {
    toast.error(message, toastOptions);
  }
}

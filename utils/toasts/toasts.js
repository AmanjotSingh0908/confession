import { Bounce, toast } from "react-toastify";

const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce
};

// export const successToast = (message) => toast.success(message, toastOptions);
// export const errorToast = (message) => toast.error(message, toastOptions);

export const toastMessage = {
    success: (message) => toast.success(message, toastOptions),
    error: (message) => toast.error(message, toastOptions),
    warning: (message) => toast.warning(message, toastOptions),
    info: (message) => toast.info(message, toastOptions)
};

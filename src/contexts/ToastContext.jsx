import Toast from "components/common/toast/Toast";
import { createContext, useState, useContext, useRef } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);
    const timeoutRef = useRef(null);

    const showToast = (message, isSuccess = true) => {
        setToast({ message, isSuccess });

        // clear any previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // set new timeout
        timeoutRef.current = setTimeout(() => {
            setToast(null);
            timeoutRef.current = null;
        }, 5000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);

export default ToastContext;

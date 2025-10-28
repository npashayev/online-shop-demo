import Toast from "components/common/toast/Toast";
import { createContext, useState, useContext, useRef } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);
    const timeoutRef = useRef();

    const showToast = (message, isSuccess = true, duration = 3500) => {
        const id = Date.now();

        setToast({ id, message, isSuccess });

        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            setToast(null);
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    isSuccess={toast.isSuccess}
                    closeToast={() => setToast(null)}
                />
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);

export default ToastContext;

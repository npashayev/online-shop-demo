import { useEffect } from 'react';

const useBodyScrollLock = (isActive) => {
    useEffect(() => {
        if (!isActive) return;

        // Save the current scroll position
        const scrollTop = window.scrollY;

        // Lock body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollTop}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';

        return () => {
            // Unlock body and restore scroll position
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollTop);
        };
    }, [isActive]);
};

export default useBodyScrollLock;

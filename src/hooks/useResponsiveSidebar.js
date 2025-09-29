import React, { useCallback, useEffect, useState } from 'react'

const useResponsiveSidebar = (query) => {
    const [isMobile, setIsMobile] = useState(() =>
        (query && typeof window !== 'undefined') ? window.matchMedia(query).matches : false
    );

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if ((!query || typeof window === 'undefined')) return;

        const mql = window.matchMedia(query);
        const handleChange = (e) => setIsMobile(e.matches);

        // initial sync
        setIsMobile(mql.matches);

        // listen for changes
        mql.addEventListener('change', handleChange);

        return () => mql.removeEventListener('change', handleChange);
    }, [query])

    useEffect(() => {
        if (query && !isMobile && open) {
            setOpen(false);
        }
    }, [isMobile, open, query]);

    const toggle = useCallback(() => setOpen(prev => !prev), []);
    const openSidebar = useCallback(() => setOpen(true), []);
    const closeSidebar = useCallback(() => setOpen(false), [])


    return { isMobile, open, setOpen, toggle, openSidebar, closeSidebar };
}

export default useResponsiveSidebar;
import { useEffect, useState, useRef, useCallback } from 'react';

const useSlideshow = ({ length, time = 5000, initialIsActive = true, resetOnInactive = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [manualReset, setManualReset] = useState(0);
    const isActiveRef = useRef(initialIsActive);

    // Update ref when active state changes
    const setActive = useCallback((value) => {
        isActiveRef.current = value;

        if (!value && resetOnInactive) {
            setActiveIndex(0);
        }
    }, [resetOnInactive]);

    // Manual timer reset helper
    const resetTimer = () => setManualReset(prev => prev + 1);

    // Manual control functions
    const increaseIndex = useCallback(() => {
        if (!length) return;
        setActiveIndex(prev => (prev + 1) % length);
        resetTimer();
    }, [length]);

    const decreaseIndex = useCallback(() => {
        if (!length) return;
        setActiveIndex(prev => (prev - 1 + length) % length);
        resetTimer();
    }, [length]);

    // Auto-slideshow effect
    useEffect(() => {
        if (!length || length <= 1) return;

        const changeActiveIndex = () => {
            if (!isActiveRef.current) return;
            setActiveIndex(prev => (prev + 1) % length);
        };

        const interval = setInterval(changeActiveIndex, time);
        return () => clearInterval(interval);
    }, [length, time, manualReset]);

    return {
        activeIndex,
        increaseIndex,
        decreaseIndex,
        setActive
    };
};

export default useSlideshow;

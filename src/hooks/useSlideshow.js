import { useEffect, useState } from 'react'

const useSlideshow = (length, time = 5000, isActive = true) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // reset activeIndex if isActive is false
        if (!isActive) setActiveIndex(0);
    }, [isActive]);

    useEffect(() => {
        if (!isActive || length <= 1) return;

        const changeActiveIndex = () => {
            setActiveIndex(prev => (prev + 1) % length)
        }
        const interval = setInterval(changeActiveIndex, time);

        return () => clearInterval(interval);
    }, [length, time, isActive]);

    return activeIndex;
}

export default useSlideshow;
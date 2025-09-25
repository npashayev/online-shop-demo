import { useEffect, useState } from 'react'

const useSlideshow = (length) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const changeActiveIndex = () => {
            setActiveIndex(prev => (prev + 1) % length)
        }
        const interval = setInterval(changeActiveIndex, 5000);

        return () => clearInterval(interval);
    }, [length]);

    return activeIndex;
}

export default useSlideshow;
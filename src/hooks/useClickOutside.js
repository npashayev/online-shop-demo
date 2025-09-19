import { useEffect } from "react";

const useClickOutside = (elements) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            elements.forEach(({ contentRef, toggleRef, onClickOutside }) => {
                if (
                    contentRef.current &&
                    !contentRef.current.contains(event.target) &&
                    (!toggleRef || !toggleRef.current.contains(event.target))
                ) {
                    onClickOutside();
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [elements]);
};

export default useClickOutside;

import { useEffect } from "react";

const useClickOutside = (elements) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            elements.forEach(({ contentRef, toggleRef, onClickOutside }) => {
                if (
                    contentRef.current &&
                    !contentRef.current.contains(e.target) &&
                    (!toggleRef || !toggleRef.current.contains(e.target))
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

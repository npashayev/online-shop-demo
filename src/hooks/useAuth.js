import { useSelector } from "react-redux";

const useAuth = () => {
    const user = useSelector(state => state.user.user);

    return {
        user,
        isAuthenticated: !!user?.token, // "!!" is for converting the value into boolean
    };
};

export default useAuth;

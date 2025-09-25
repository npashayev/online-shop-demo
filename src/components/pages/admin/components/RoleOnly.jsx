import useAuth from "hooks/useAuth";

const RoleOnly = ({ children, roles }) => {
    const { user } = useAuth();

    if (!user?.role || !roles.includes(user.role)) return null;
    return children;
};

export default RoleOnly;
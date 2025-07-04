import { Navigate } from "react-router-dom";

const RequireRole = ({ allowedRole, children }) => {
    const role = localStorage.getItem("userRole");

    if (role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireRole;

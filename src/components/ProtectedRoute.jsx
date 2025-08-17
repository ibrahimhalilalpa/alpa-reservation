import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, allowedRoles, children }) {
    if (!user) {
        // kullanıcı yoksa login'e at
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // rol izinli değilse anasayfaya at
        return <Navigate to="/" replace />;
    }

    return children;
}

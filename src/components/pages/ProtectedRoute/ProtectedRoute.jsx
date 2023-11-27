import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Notpermitted from "../../Notpermitted/Notpermitted"
const RoleBaseRoute = (props) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin'); 
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    if (isAdminRoute && userRole !== 'ADMIN') {
        // Chuyển hướng người dùng đến trang Notpermitted nếu không có quyền truy cập admin
         return <Navigate to="/notpermitted" />;
    }

    return <>{props.children}</>;
}       

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    return (

        <div>
            {isAuthenticated === true ?
                <RoleBaseRoute>
                    <>{props.children}</>
                </RoleBaseRoute>
                : <Navigate to={'/login'} replace />
            }
        </div>
    )
}

export default ProtectedRoute
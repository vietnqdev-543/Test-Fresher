import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Notpermitted from "../Notpermitted/Notpermitted"
const RoleBaseRoute= ()=>{
    const isAdminRoute = window.location.pathname.startsWith('/admin') // xác nhận có vào trang admin không
    const user = useSelector(state => state.account.user) 
    const userRole = user.role

    if(isAdminRoute && userRole === 'ADMIN'){
        return (<>{props.children}</>)
    }else{
         return <Notpermitted />
    }
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
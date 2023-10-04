import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage"
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/pages/register/Register";
import { useEffect } from "react";
import { callFetchAccount } from "./components/services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/loading/Loading";
import NotFound from "./components/pages/NotFound/NotFound";
import AdminPage from "./components/pages/admin/admin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Layout = ()=> {
  return (
    <>
    <div className="layout-app"></div>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
const LayoutAdmin = ()=> {
    const isAdminRoute = window.location.pathname.startsWith('/admin') // xác nhận có vào trang admin không
    const user = useSelector(state => state.account.user) 
    const userRole = user.role
  return (
    <>
    <div className="layout-app"></div>
     {isAdminRoute && userRole === 'ADMIN' && <Header/>}
      <Outlet />
     {isAdminRoute && userRole === 'ADMIN' && <Footer/>}
      
    </>
  )
}

export default function App(){
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const getAccount = async () => {
    if(window.location.pathname === '/login' 
      || window.location.pathname === '/register'
      || window.location.pathname === '/'
    
    ) return ;
    const res = await callFetchAccount()
    if(res && res.data){
      dispatch(doGetAccountAction(res.data))
    }
  }
  useEffect(()=>{
    getAccount()
  }, [])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement : <NotFound/>  ,
      children: [
        {index : true  , element : <Home />} ,
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path : "register" ,
          element : <Register />
        }
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin/>,
      errorElement : <NotFound/>  ,
      children: [
        {index : true  , element :
          <ProtectedRoute >
            <AdminPage />
          </ProtectedRoute>
          } ,
        {
          path: "user",
          element: <LoginPage />,
        },
        {
          path : "book" ,
          element : <Register />
        }
      ],
    },
   
  ]);
  return(
    <>
    {isAuthenticated === true || window.location.pathname === '/login' ||
    window.location.pathname === '/register'||
    window.location.pathname === '/' ?
      <RouterProvider router={router} />
      :
      <Loading />
    }
  
    
    </>
  )
}



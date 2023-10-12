import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage"
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/pages/register/Register";
import { useEffect, useState } from "react";
import { callFetchAccount } from "./components/services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/loading/Loading";
import NotFound from "./components/pages/NotFound/NotFound";
import AdminPage from "./components/pages/admin/AdminPage";
import ProtectedRoute from "./components/pages/ProtectedRoute/ProtectedRoute";
import Product from "./components/pages/Product/Product";
import UserPage from "./components/pages/admin/UserManage/UserManage";
import BookPage from "./components/pages/admin/BookManage";
import LayoutAdmin from "./components/pages/admin/LayoutAdmin";
import UserManage from "./components/pages/admin/UserManage/UserManage";
import BookManage from "./components/pages/admin/BookManage";
import OrderManage from "./components/pages/admin/OrderManage";



const Layout = ()=> {
  const isAuthenticated = useSelector (state => state.account.isAuthenticated )
  const isLoginRoute = window.location.pathname.startsWith("/login")
  return (
    <>
    <div className="layout-app"></div>

     {/* {isAuthenticated ? <Header /> : null} */}
     {isLoginRoute ? null : <Header />}
     {/* <Header /> */}
      <Outlet /> 
      <Footer />
     
    </>
  )
}
// const LayoutAdmin = ()=> {
//     const isAdminRoute = window.location.pathname.startsWith('/admin') // xác nhận có vào trang admin không
//     const user = useSelector(state => state.account.user) 
//     const userRole = user.role
//   return (
//     <>
//     <div className="layout-app"></div>
//       {/* {isAdminRoute && userRole === 'ADMIN' && <Header/>}  */}
//      {isAdminRoute && userRole === 'ADMIN' ? null :<Header />}
//       <Outlet />
//      {isAdminRoute && userRole === 'ADMIN' && <Footer/>}
      
//     </>
//   )
// }
<LayoutAdmin/>

export default function App(){
  const dispatch = useDispatch()
 
  const isLoading = useSelector(state => state.account.isLoading)
  const getAccount = async () => {
    if(window.location.pathname === '/login' 
      || window.location.pathname === '/register'
      
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
        },
        {
          path : "product" ,
          element : <Product />   
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
          element: <UserManage />,
        },
        {
          path : "book" ,
          element : <BookManage />
        },
        {
          path : "order" ,
          element :  <OrderManage />
        }
      ],
    },
   
  ]);
  return(
    <>
    {isLoading === false 
    ||window.location.pathname === '/login' 
    ||window.location.pathname === '/register' 
    ||window.location.pathname === '/'
    ?
      <RouterProvider router={router} />
    :
      <Loading />
    }
  
    
    </>
  )
}



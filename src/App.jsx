import {createBrowserRouter,RouterProvider, useLocation} from "react-router-dom";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/pages/ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import Header from "./components/layout/header/Header";
import Footer from './components/layout/footer/Footer'
import Home from './components/Home/Home'
import LoginPage  from "./components/pages/login/LoginPage";
import Register from "./components/pages/Register/Register";
import { callFetchAccount } from "./components/services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/loading/Loading";
import NotFound from "./components/pages/NotFound/NotFound";

import Product from './components/pages/Product/Product'
import AdminPage from './components/pages/admin/DashBoard/AdminPage'
import LayoutAdmin from './components/pages/admin/LayoutAdmin'


import BookManage from './components/pages/admin/BookManage/BookManage'
import OrderManage from "./components/pages/admin/OrderManage/OrderManage";
import UserManage from "./components/pages/admin/UserManage/UserManage";
import UserDisable from "./components/pages/admin/UserManage/UserDisable";



const Layout = ()=> {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login' ;
    const isRegisterPage = location.pathname === '/register'
  return (
    <>
      {!isLoginPage && !isRegisterPage && ( <Header /> )}
        <Outlet />
      {!isLoginPage && !isRegisterPage && <Footer />}
    </>
  )
}

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
  const [disabledUsers, setDisabledUsers] = useState([]);

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
          element: <UserManage />
        },
        {
          path: "userDisable",
          element: <UserDisable />
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



import {createBrowserRouter,RouterProvider, useLocation} from "react-router-dom";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/pages/ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import Header from "./components/pages/Header/Header";
import Footer from "./components/pages/Footer/Footer";
import Home from "./components/pages/Home/Home";
import LoginPage  from "./components/pages/login/LoginPage";
import Register from "./components/pages/register/Register";
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
import ProductDetailPage from "./components/pages/Product/ProductDetailPage";
import ViewDetails from "./components/test/ViewDetails";
import Test from "./components/test/Test";

import './components/style/global.scss'
import OrderPage from "./components/pages/OrderPage/OrderPage";


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
        },
        {
          path : 'book/:slug',
          element : <ProductDetailPage />
        },
        {
          path:'test',
          element : <Test />
        },
        {
          path: 'viewDetail',
          element : <ViewDetails />
        },
        {
          path : 'order',
          element:<OrderPage />
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
          path : "book" ,
          element : <BookManage />
        },
        {
          path : "order" ,
          element :  <OrderManage />
        },
      
        
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



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage"
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
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

export default function App(){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement : <div>Error</div>  ,
      children: [
        {index : true  , element : <Home />} ,
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
   
  ]);
  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}



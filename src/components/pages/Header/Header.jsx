import { useSelector } from "react-redux"
import { Avatar, Dropdown, Space, message } from 'antd';

import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import { callLogout } from "../../services/api";
import './Header.scss'
const Header = () => {
  const isAuthenticated = useSelector(state => (state.account.isAuthenticated))
  const userFullname = useSelector(state => state.account.user.fullName)
  const adminRoute = useSelector(state => state.account.user.role === 'ADMIN')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlelogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công")
      navigate("/")
    }
  }
  const user = useSelector(state => state.account.user)
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`
  const items = [
    adminRoute ? 
      {
      label: <label onClick={()=> {navigate('/admin')}}>Trang Admin</label>,
      key: 'adminPage',
      } : null
      ,
      adminRoute ?
      {
        type: 'divider',
      } : null ,
    {
      label: <label> Quản lí tài khoản</label>,
      key: 'account',
    },
    {
      type: 'divider',
    },
    {
      label: <label onClick={() => handlelogout()}> Đăng xuất</label>,
      key: 'logout',
    },
  ];

  return (
    <>
      <div className="header-container">

        <div className="header-item-nav">
          <div className="nav-logo">
          <Link style={{color : 'white' , textDecoration : 'none'}} to={"/"}>READCYCLE</Link>
          </div>
          <div className="nav-menu-item">
            <Link style={{color : 'white' , textDecoration : 'none'}} to={"/product"}>PRODUCT</Link>
          </div>
          <div className="nav-menu-item">
            <Link style={{color : 'white' , textDecoration : 'none'}} to={""}>SERVICE</Link>
          </div>
          <div className="nav-menu-item">
            <Link style={{color : 'white' , textDecoration : 'none'}} to={""}>CONTACT</Link>
          </div>
        </div>




        <div className="header-item">
            {isAuthenticated === true ? (
              <div className="nav-userName" >
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                    <Avatar className='header-avatar' size='large' src={urlAvatar} icon={<UserOutlined />} />
                     <span style={{color:'white' , fontSize : '15px' , fontWeight:'bolder'}}> {userFullname}</span>
                      <DownOutlined  style={{color : 'white'}}/>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            ) : (
              <div className="nav-link" >
                <div><Link style={{color : 'white' , fontWeight : 'bolder' , textDecoration : 'none' , padding : '0 10px' ,fontSize : '20px'}} to={"/login"}>Login</Link></div>
                <div><Link style={{color : 'white' , fontWeight : 'bolder' , textDecoration : 'none' , padding : '0 10px' ,fontSize : '20px'}} to={"/register"}>Register</Link></div>
              </div>
            )}   
        </div>

      </div>
    </>
  )
}



export default Header
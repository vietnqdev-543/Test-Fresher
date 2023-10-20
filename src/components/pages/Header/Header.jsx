import { useSelector } from "react-redux"
import "./Header.scss"
import { BsMinecart } from 'react-icons/bs';
import { Avatar, Dropdown, Space, message } from 'antd';

import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import { callLogout } from "../../services/api";

const Header = () => {
  const isAuthenticated = useSelector(state => (state.account.isAuthenticated))
  const userFullname = useSelector(state => state.account.user.fullName)

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
  const items = [
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
          <div className="nav-logo">Logo</div>
          <div className="nav-menu-item">
            <Link to={"/"}>Home</Link>
          </div>
          <div className="nav-menu-item">
            <Link to={"/product"}>Product</Link>
          </div>
          <div className="nav-menu-item">
            <Link to={""}>Service</Link>
          </div>
        </div>




        <div className="header-item">
          <div className="nav-user">
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
                      <Avatar size='small' icon={<UserOutlined />} />
                      {userFullname}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            ) : (
              <div className="nav-link">
                <div><Link to={"/login"}>Login</Link></div>
                <div><Link to={"/register"}>Register</Link></div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}



export default Header
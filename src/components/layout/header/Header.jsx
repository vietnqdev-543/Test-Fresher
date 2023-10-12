import { useSelector } from "react-redux"
import "./Header.scss"
import { Link } from "react-router-dom"
import { BsMinecart } from 'react-icons/bs';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { doLogoutAction } from "../../../redux/account/accountSlice";
import { message } from "antd";
import { useNavigate} from "react-router-dom";
import { callLogout } from "../../services/api";
import { useDispatch } from "react-redux";
const Header = () => {
  const isAuthenticated = useSelector(state => (state.account.isAuthenticated))
  const userFullname = useSelector(state => state.account.user.fullName)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlelogout = async() => {
    const res = await callLogout();
    if (res && res.data){
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công")
      navigate ("/")
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
      label: <label   onClick={() => handlelogout()}> Đăng xuất</label>  ,
      key: 'logout',
    },
  ];

  return (
    <>
      <div className="header-container">

        <div className="header-item">
          <div className="nav-logo">PRODIGY GLASSES</div>
        </div>

        <div className="header-item">
          <div className="nav-menu">
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
        </div>


        <div className="header-item">
          <div className="nav-SearchBar">
            <input type="text" placeholder="Search ..." />
          </div>

          <div className="nav-cart">
            <BsMinecart size={30} />
          </div>

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
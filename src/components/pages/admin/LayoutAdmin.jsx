
import { Outlet } from 'react-router-dom'
import { Menu, message , notification} from 'antd';
import "./LayoutAdmin.scss"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md"
import { FaUserCircle } from 'react-icons/fa'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Avatar } from 'antd';
import { callLogout } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { doLogoutAction } from '../../../redux/account/accountSlice';
import { FiSearch } from "react-icons/fi"
import { AiFillGithub, AiOutlineBell } from 'react-icons/ai';
import { BsSun } from "react-icons/bs"
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



const items = [
  getItem('', 'sub1 ', <Link to="/admin"> <span className='nav-icon'><MdDashboard /></span> DashBoard</Link>),
  {
    type: 'divider',
  },
  getItem('Manage User ', 'sub2', <span className='nav-icon'> <FaUserCircle /></span>, [
    getItem('', '1', <Link to="/admin/user">CRUD</Link>),
    getItem('', '2', <Link to="/admin/userDisable">Account Disable</Link>),
  ]),
  {
    type: 'divider',
  },
  getItem('', '3', <Link to="/admin/book">Products</Link>),
  getItem('', '4', <Link to="/admin/order"> Manage Orders</Link>),

];




const LayoutAdmin = () => {

  const onClick = (e) => {
    console.log('click ', e);
  };


  // const userName = useSelector(state => state.account.user.fullName)
  const user = useSelector(state => state.account.user)
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công")
      navigate('/login')
    }
  }
  const handleHome = () => {
    notification.success({
      message : 'Thông báo' ,
      description : 'Chuyển sang trang home thành công'
  })
    navigate("/")
  }
  const nightMode =()=> {
    alert('nigh mode')
  }
  return (
    <div className="container">
      <div className="layout-app">
        <div className="aside item">
          <div className="aside-header">
            <h2 className='aside-header-brand'>Glasses Store</h2>
          </div>
          <Menu
            onClick={onClick}
            style={{
              width: '100%',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
        <div className="content item">
          <div className="content-header">
            <div className='header-search'>
              <FiSearch className='icon' />
              <input type="text" placeholder='Search ' />


            </div>
            <div className="header-right">
              <AiFillGithub className='icon-link-item' />    
                <AiOutlineBell className='icon-link-item' />
                <BsSun onClick={()=>{nightMode()}} className='icon-link-item' />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">
                      <Link to="/account">Quản lý tài khoản</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <a onClick={handleHome}>Trang chủ</a>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <a onClick={handleLogout}>Đăng xuất</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <div className="header-username">
                    <Avatar className='header-avatar' size='large' src={urlAvatar} icon={<UserOutlined />} />
               
                  </div>
                </div>
              </Dropdown>

            </div>
          </div>
          <div className="content-app">
            <Outlet />

          </div>
        </div>
      </div>
    </div>




  )
}

export default LayoutAdmin
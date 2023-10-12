
import { Outlet } from 'react-router-dom'
import { AppstoreOutlined, } from '@ant-design/icons';
import { Menu } from 'antd';
import "./LayoutAdmin.scss"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  getItem('', 'sub1 ', <Link to="/admin">DashBoard</Link>),
  {
    type: 'divider',
  },
  getItem('Manage User ', 'sub2', <AppstoreOutlined />, [
    getItem('', '1', <Link to="/admin/user">CRUD</Link>),
    getItem('Files', '2'),
  ]),
  {
    type: 'divider',
  },
  getItem('', '3', <Link to="/admin/book">Manage Books</Link>),
  getItem('', '4', <Link to="/admin/order"> Manage Orders</Link>),
];
const LayoutAdmin = () => {



  const onClick = (e) => {
    console.log('click ', e);
  };


  const userName = useSelector(state => state.account.user.fullName)
  return (
    <div className="container">
        <div className="header">
          <div className="header-aside item">
            <h3 className='title'>ADMIN</h3>
          </div>
          <div className="header-content item">
          {userName}
          </div>
        </div>
       
      <div className="layout-app">
        <div className="aside item">
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
        <div className="content item">
          <Outlet />
        </div>
      </div>
    </div>




  )
}

export default LayoutAdmin
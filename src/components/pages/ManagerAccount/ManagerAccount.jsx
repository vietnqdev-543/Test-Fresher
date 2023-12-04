import React from 'react'
import {  Modal , Tabs } from 'antd';
import UpdateInfo from './UpdateInfo';
import ChangePassword from './ChangePassword';
const ManagerAccount = ({isModalOpen ,setIsModalOpen}) => {
    const items = [
        {
          key: '1',
          label: 'Update Infomation',
          children: <UpdateInfo />,
        },
        {
          key: '2',
          label: 'Change Password',
          children: <ChangePassword />,
        },
      ];
    

    
  return (
      <>
        <Modal width={'45%'} title="Manager Account" open={isModalOpen} footer={null} onCancel={()=> {setIsModalOpen(false)}  }>
            <Tabs  style={{minHeight:'400px' }} defaultActiveKey="1" items={items}  />
        </Modal>
    </>
  )
}

export default ManagerAccount
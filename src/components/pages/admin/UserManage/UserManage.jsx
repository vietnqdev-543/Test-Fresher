import { useEffect, useState } from 'react'
import {  Table , Drawer } from 'antd';
import { callFetchListUser } from '../../../services/api';
import "./style.scss"
import InputSearch from './InputSearch';
import { Badge, Descriptions } from 'antd';




const UserManage = () => {
  const [listUser , setListUser] = useState([])
  const [current,  setCurrent]= useState(1) // lưu lại trạng thái của table đang ở trang bao nhiêu
  const [pageSize , setPageSize] = useState(4) // lấy bao nhiêu phần tử 1 lần (table hiển thị bao nhiêu phần tử)
  const [total , setTotal] = useState (0) 
  const [open , setOpen] = useState(false)

  useEffect(()=> {
    fetchUser();
  },[current , pageSize])


  const fetchUser = async (searchFilter) => {
    let query = `current=${current}&pageSize=${pageSize}`
    if(searchFilter){
      query += `&${searchFilter}`
    }
    const res = await callFetchListUser(query)
     if(res && res.data){
       setListUser(res.data.result);
       setTotal(res.data.meta.total)
    }
  }

  const showDrawer = () => {
    setOpen(true);
};
const onClose = () => {
    setOpen(false);
};
 

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter : true 
    },
    {
      title: 'FullName',
      dataIndex: 'fullName',
      sorter : true 
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter : true 
    },
    {
      title : 'Phone Number',
      dataIndex : 'phone',
      sorter : true 
    }, 
    {
      title : 'Role User',
      dataIndex : 'role'
    },  
    { 
      title : "Action",
      render : (text , record , index) => {
        return(
          <>
            <button className='btn btn-delete'>Disable</button>
            <button className='btn btn-viewDetails' onClick={showDrawer}>View details</button>
          </>
        )
      }
    },
    
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if(pagination && pagination.current !== current){
      setCurrent(pagination.current)
    }
    if(pagination && pagination.pageSize !== pageSize){
      setPageSize(pagination.pageSize)
      setCurrent(1)
    }
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    fetchUser(query)
  }
  return (
    <>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <InputSearch handleSearch={handleSearch} />
      <Table

      
        className='def'
        columns={columns} 
        dataSource={listUser} 
        onChange={onChange} 
        rowKey= "_id"
        pagination={{ 
          current: current, 
          pageSize: pageSize, 
          showSizeChanger: true , 
          total : total
        }} />;
    </>
  )
}

export default UserManage
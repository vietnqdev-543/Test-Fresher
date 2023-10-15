import { useEffect, useState } from 'react'
import {  Table , Button } from 'antd';
import { callFetchListUser } from '../../../services/api';
import "./style.scss"
import InputSearch from './InputSearch';
import {AiOutlineEye} from "react-icons/ai"
import {BsTrash} from "react-icons/bs"
import { ReloadOutlined } from '@ant-design/icons';
import ModalCreateUser from './ModalCreateUser';
import { PlusOutlined , CloudDownloadOutlined ,EditOutlined} from '@ant-design/icons';
import ViewDetailsUser from './ViewDetailsUser';
import * as XLSX from 'xlsx';
import moment from 'moment';
const UserManage = () => {
  const [listUser , setListUser] = useState([])
  const [current,  setCurrent]= useState(1) // lưu lại trạng thái của table đang ở trang bao nhiêu
  const [pageSize , setPageSize] = useState(4) // lấy bao nhiêu phần tử 1 lần (table hiển thị bao nhiêu phần tử)
  const [total , setTotal] = useState (0) 

  //drawer view details
  const [openViewDetail , setOpenViewDetail] = useState(false)
  const [dataViewDetail , setDataViewDatail] =useState ("")

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
    setOpenViewDetail(true);
};
  const onClose = () => {
    setOpenViewDetail(false);
  };
 
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'fullName',
      sorter : true 
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter : true 
    },
    {
      title : 'số điện thoại',
      dataIndex : 'phone',
      sorter : true 
    }, 
    {
      title : 'Role User',
      dataIndex : 'role'
    },  
    {
      title : 'Ngày cập nhật',
      render: (text, record) => moment(record.updatedAt).format('YYYY-MM-DD HH:mm:ss') ,
      sorter :true
    },
    { 
      title : "Action",
      render : (text , record , index) => {
        return(
          <>
            <div style={{display: 'flex' , alignItems : 'center'}}>
            <BsTrash style={{ paddingRight : 10, fontSize: 28}} />
            <EditOutlined style={{ paddingRight : 10, fontSize: 20}} />
            <AiOutlineEye  style={{ fontSize: 25}}  onClick={()=> {setDataViewDatail(record) , setOpenViewDetail(true) }}  />
            </div>
            
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

  // input Search
  const handleSearch = (query) => {
    fetchUser(query)
  }

  //Modal add user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
      setIsModalOpen(true);
  };
  const handleOk = () => {
      setIsModalOpen(false);
  };
const handleCancel = () => {
      setIsModalOpen(false);
};


//handle export
  const handleExport = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.xlsx");
    }
  }
  return (
    <>    
      {/* Props */}
      <InputSearch handleSearch={handleSearch} />
      <ViewDetailsUser openViewDetail={openViewDetail} dataViewDetail={dataViewDetail} onClose={onClose} />
      <ModalCreateUser isModalOpen={isModalOpen} showModal={showModal} handleCancel={handleCancel} handleOk={handleOk}  fetchUser={fetchUser} />
      {/* ------------- */}

      <div className='table-header' >
        <div className='table-header-title'>Table list Users</div>
        <div className='table-header-btn' >
        <button className='btn-primary' onClick={handleExport}>
          <CloudDownloadOutlined style={{ paddingRight: '5px' }} /> Export
        </button>
          <button className='btn-primary' onClick={showModal}><PlusOutlined style={{paddingRight : '5px'}} /> Add User</button>
          <Button type='ghost'> <ReloadOutlined /></Button>
        </div>
      </div>
      

    
      
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
          total : total,

          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} trên {total} rows
              </div>
            );
          }
      
        }}
        
      />;
    </>
  )
}

export default UserManage
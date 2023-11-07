import { useEffect, useState } from 'react'
import {  Table , Button , Popconfirm, message, notification } from 'antd';
import { callDeleteAUser, callFetchListBook , callDeleteBook } from '../../../services/api';
import { ReloadOutlined } from '@ant-design/icons';
import { PlusOutlined , CloudDownloadOutlined ,EditOutlined , DeleteOutlined ,EyeOutlined} from '@ant-design/icons';
import ModalUpdateUser from '../UserManage/ModalUpdateUser';
import * as XLSX from 'xlsx';
import moment from 'moment';
import ViewDetailsBook from './ViewDetailsBook';
import InputSearchBook from './InputSearchBook';
import ModalCreateBook from './ModalCreateBook';
import ModalUpdateBook from './ModalUpdateBook';


const UserManage = () => {
  const [listBook , setListBook] = useState([])
  const [current,  setCurrent]= useState(1) // lưu lại trạng thái của table đang ở trang bao nhiêu
  const [pageSize , setPageSize] = useState(6) // lấy bao nhiêu phần tử 1 lần (table hiển thị bao nhiêu phần tử)
  const [total , setTotal] = useState (0) 
  const [sortQuery, setSortQuery] = useState("sort=-sold")


  //drawer view details
  const [openViewDetail , setOpenViewDetail] = useState(false)
  const [dataViewDetail , setDataViewDetail] =useState ([])

  useEffect(()=> {
    fetchBook();
  },[current , pageSize , sortQuery])


  const fetchBook = async (searchFilter) => {
    let query = `current=${current}&pageSize=${pageSize}`
    if(searchFilter){
      query += `&${searchFilter}`
    }
    if (sortQuery) {
      query += `&${sortQuery}`
  }
    const res = await callFetchListBook(query)
     if(res && res.data){
       setListBook(res.data.result);
       setTotal(res.data.meta.total)
    }
  }

  const columns = [
    
   
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Tên sách',
      dataIndex: 'mainText',
      sorter : true 
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      sorter : true 
    },
    {
      title : 'Tác giả',
      dataIndex : 'author' ,
      sorter : true 
    }, 
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      width: 120,
      render: (text, record) => (
        <span>{record.price} VND</span>
      ),
    },
    {
      title : 'Ngày cập nhật',
      render: (text, record) => moment(record.updatedAt).format('HH:mm:ss DD-MM-YYYY') ,
      sorter :true
    },
    { 
      title : "Action",
      render : (text , record , index) => {
        return(
          <>
            <div style={{display: 'flex' , alignItems : 'center'}}>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận"
              description="Bạn chắc chắn muốn vô hiệu hóa sách này?"
              onConfirm={()=> {handleDeleteBook(record._id)}}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <DeleteOutlined  style={{ paddingRight : 10, fontSize: 20 , cursor : 'pointer'}} />
            </Popconfirm>
            <EditOutlined onClick={()=>{showModalUpdate() ; setDataUpdate(record)}} style={{ paddingRight : 10, fontSize: 20}} />
            <EyeOutlined  style={{ fontSize: 20}}  onClick={()=> {setDataViewDetail(record ) , setOpenViewDetail(true) }}  />
            </div>
            
          </>
        )
      }
    },
    
  ];

  const showDrawer = () => {
    setOpenViewDetail(true);
    console.log(dataViewDetail(record));
};

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
    fetchBook(query)
  }

  //handle export
  const handleExport = () => {
    if (listBook.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listBook);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.xlsx");
    }
  }

  //Modal add book
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

//modal update book 
const [openModalUpdate , setOpenModalUpdate] = useState(false)
const [dataUpdate , setDataUpdate] = useState([])
const showModalUpdate = (record) => {
  setDataUpdate(record)
  setOpenModalUpdate(true)
}
const handleOkUpdate = () => {
  setOpenModalUpdate(false);
};
const handleCancelUpdate = () => {
  setOpenModalUpdate(false);
};


const handleDeleteBook = async(id) => {
  const res = await callDeleteBook(id)
  if(res  && res.data){
    notification.success({
      message : 'Thông báo ',
      description : 'Sản phẩm đã được chuyển sang thùng rác'
    })
    fetchBook()
  }else{
    notification.error({
      message : 'Đã có lỗi xảy ra' ,
      description : res.message 
    })
  }
}




  return (
    <>                                                    
      {/* Props */}
      <InputSearchBook handleSearch={handleSearch} />
      <ViewDetailsBook openViewDetail={openViewDetail} dataViewDetail={dataViewDetail} setOpenViewDetail={setOpenViewDetail} setDataViewDetail={setDataViewDetail} />
      <ModalCreateBook isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleCancel={handleCancel} handleOk={handleOk}  fetchBook={fetchBook} />
      <ModalUpdateBook openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} fetchBook={fetchBook}/>
     

    
      {/* ------------- */}

      <div className='table-header' >
        <div >Danh sách sách</div>
        <div className='table-header-btn' >
        <button className='btn-primary' onClick={handleExport}>
          <CloudDownloadOutlined style={{ paddingRight: '5px' }} /> Export
        </button>
          <button className='btn-primary' onClick={showModal}><PlusOutlined style={{paddingRight : '5px'}} /> Thêm sách</button>
      
          <Button type='ghost'> <ReloadOutlined /></Button>
        </div>
      </div>
      

    
      
      <Table
        className='def'
        columns={columns} 
        dataSource={listBook} 
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
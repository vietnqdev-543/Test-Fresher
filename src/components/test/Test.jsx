
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Space, Table, Tag , Drawer , Descriptions, Badge } from 'antd';


const Test = () => {
  const navigate = useNavigate();
 
  const handleClick = () => { 
      navigate('/viewDetail');
  }
  const columns = [

    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tổng giá trị đơn hàng',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'status',
      dataIndex: 'status',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showDrawer}>View Details</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: 'id',
      id: '18058083168' , 
      name: 'Adidas Track 6 ',     
      price: '200.000 vnd',
      payment: 'COD',
      tags: ['Hoàn thành'],
    },
    {
      key: '2',
      id: '18058083584' , 
      name: 'Vans Old School',     
      price: '150.000 vnd',
      payment: 'Master Card',
      tags: ['Đang vận chuyển'],
    },
    {
      key: '3',
      id: '18058083739' , 
      name: 'Nick AirFord 1',
      price: '100.000 vnd',
      payment: 'COD',
      tags: ['Hoàn Thành'],
    },
  ];
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
        <div onClick={handleClick} style={{ width: '100px', height: '30px', display: 'flex', margin: '0 auto',    backgroundColor: 'orange' }}>
          click me
        </div>      

        <Table columns={columns} dataSource={data} />;

        <Drawer title="Basic Drawer" width={'50%'} placement="right" onClose={onClose} open={open}>
       
                <Descriptions title="Thông tin user" bordered column={2}>
                    <Descriptions.Item label="Order id" >18058083168</Descriptions.Item>
                    <Descriptions.Item label="Product name" >Adidas Track6</Descriptions.Item>
                    <Descriptions.Item label="payment" >COD</Descriptions.Item>
                    <Descriptions.Item label="Total Price" >200.000vnd</Descriptions.Item>
                    <Descriptions.Item label="Status " span={2} >
                        <Badge status="processing" text={'Hoàn thành'}  />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At" >15/11/2023</Descriptions.Item>
                    <Descriptions.Item label="Updated At" >15/11/2023</Descriptions.Item>

                </Descriptions>
       
      </Drawer>
       
      
    </div>
  )
}

export default Test;

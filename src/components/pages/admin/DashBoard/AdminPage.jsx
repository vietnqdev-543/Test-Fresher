import React from 'react';
import { Button, Col, Row, Statistic, Card, Space, Progress } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './AdminPage.scss';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  return (
    <div>
      <div className="dashboard-app">
        <div className="item item1  ">
          <h2 className='text-xl font-bold p-5'>Account</h2>
        </div>
        <div className="item item2">
        <h2 className='text-xl font-bold p-5'>Order</h2>
        </div>
        <div className="item item3">
          <h2  className='text-xl font-bold p-5'>Message</h2>
        </div>
        <div className="item item4">
          <h2  className='text-xl font-bold p-5'>Order shipping</h2>
        </div>
        <div className="item item5">item5</div>
        <div className="item item6">item6</div>
      </div>
    </div>
  );
};

export default AdminPage;

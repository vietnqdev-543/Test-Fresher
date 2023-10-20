import React from 'react'
import { Button, Col, Row, Statistic, Card, Space, Progress } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './AdminPage.scss'
import { useSelector } from 'react-redux';
const AdminPage = () => {
  const userName = useSelector(state => (state.account.user.fullName))
  return (
    <div>
      <div className="dashboard-app">
        <div className="item item1  flex justify-beetwen ">
          <h1 className='text-2xl font-bold p-5'>Have a good day {userName} 🎉</h1>

        </div>
        <div className="item item2"></div>
        <div className="item item3">item3</div>
        <div className="item item4">item4</div>
        <div className="item item5">item5</div>
        <div className="item item6">item6</div>
        <div className="item item7 items-center">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Active Users" value={112893} />
            </Col>
            <Col span={12}>
              <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
              <Button
                style={{
                  marginTop: 16,
                }}
                type="primary"
              >
                Recharge
              </Button>
            </Col>
            <Col span={12}>
              <Statistic title="Active Users" value={112893} loading />
            </Col>
          </Row>
        </div>
        <div className="item item8">item8</div>
        <div className="item item9">item9</div>
        <div className="item item10">item10</div>
      </div>
    </div>
  )
}
export default AdminPage
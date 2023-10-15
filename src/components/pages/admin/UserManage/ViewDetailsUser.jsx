import React, { useState } from 'react';
import { Button, Drawer, Descriptions, Badge } from 'antd';
const ViewDetailsUser = ({ openViewDetail, dataViewDetail , onClose }) => {

    return (
        <>
            <Drawer title="Xem chi tiết tài khoản người dùng" width={'40%'} placement="right" onClose={onClose} open={openViewDetail}>
                <Descriptions title="Thông tin user" bordered column={2}>
                    <Descriptions.Item label="id" >{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Full name" >{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email" >{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Number Phone" >{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role " span={2} >
                        <Badge status="processing" text={dataViewDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At" >{dataViewDetail?.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Updated At" >{dataViewDetail?.updatedAt}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailsUser
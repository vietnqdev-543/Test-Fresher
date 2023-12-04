import React, { useState } from 'react'
import { Avatar, Upload, Button, Input, Form, Col, message, notification } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { callUpdateAvatar, callUpdateUserInfo } from '../../services/api'
import { doUpdateUserInfoAction, doUploadAvatarAction } from '../../../redux/account/accountSlice'

const UpdateInfo = () => {
    const user = useSelector(state => state.account.user)
    const email = user?.email
    const name = user.fullName
    const phone = user.phone
    const [isSubmit, setIsSubmit] = useState(false)
    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "")
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`
    const [form] = Form.useForm()
    const dispath = useDispatch()

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUpdateAvatar(file);
        if (res && res.data) {
            const newAvatar = res.data.fileUploaded;
            dispath(doUploadAvatarAction({ avatar: newAvatar }))
            setUserAvatar(newAvatar)
            onSuccess('ok')
        } else {
            onError('error')
        }
    }
    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onchange(info) {
            if (info.file.status !== 'uploading') {
            } if (info.file.status === 'done') {
                message.success('Upload Succes')
            }
            else if (info.file.status === 'error') {
                message.error('Upload Error')
            }
        }
    }

    const onFinish = async (values) => {
        const { fullName, phone, _id } = values
        console.log(fullName , phone , _id);
        setIsSubmit(true)
        const res = await callUpdateUserInfo(_id, fullName, phone, userAvatar);
        console.log("Phản hồi API Cập nhật Thông tin Người dùng:", res);

        if (res && res.data) {
            //update redux
            dispath(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName }))
            message.success('Update Succesfully')

            localStorage.removeItem('acces_token')
        } else {
            notification.error({
                message: 'error',
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (


        <Form
            style={{ display: 'flex', width: '100%' }}
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div style={{ width: '40%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar
                    style={{ display: 'block', marginBottom: '20px' }}
                    size={100}
                    icon={<UserOutlined />}
                    src={urlAvatar}
                />

                <Upload {...propsUpload} >
                    <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
            </div>
            <div style={{ width: '60%' }}>
                <Col hidden>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="id"
                        name="_id"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        initialValue={email}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter name' }]}
                        initialValue={name}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                        initialValue={phone}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Button onClick={onFinish}>Submit</Button>

            </div>
        </Form>

    )
}

export default UpdateInfo
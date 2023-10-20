
import { Modal, Form, Input, Divider, message, notification } from 'antd';
import { useEffect } from 'react';
import { callUpdateAUser } from '../../../services/api';
const ModalUpdateUser = ({ isOpenModalUpdateUser, handleOkUpdateUser, handleCancelUpdateUser, fetchUser ,dataUpdate  ,setDataUpdate}) => {

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {fullName,_id,  phone} = values;
        const res = await callUpdateAUser(_id, fullName, phone);
        if (res && res.data) {
            message.success('Update thành công');
            handleOkUpdateUser();
            await fetchUser();
        } else {
            if (res && res.data && res.data.message) {
                notification.error({
                  message: 'Đã có lỗi xảy ra',
                  description: res.data.message,
                });
              } else {
                notification.error({
                  message: 'Đã có lỗi xảy ra',
                  description: 'Không thể cập nhật tài khoản.',
                });
              }
        }
    }

    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate]);
    

    return (
        <Modal title="Cập nhật thông tin tài khoản" open={isOpenModalUpdateUser} onOk={()=>{form.submit()}} onCancel={()=> {handleCancelUpdateUser() ; setDataUpdate(true)}}  okText={'Cập nhật'} cancelText={'Hủy bỏ'} >
            <Divider />
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="_id" name="_id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="Tên hiển thị" name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên hiển thị!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ModalUpdateUser;

import { Button, Modal, Checkbox, Form, Input, Divider, message, notification } from 'antd';
import { callCreateAUser } from '../../../services/api';
const ModalCreateUser = ({ isModalOpen, showModal, handleOk, handleCancel ,fetchUser }) => {
    const [form] = Form.useForm()
   

    const onFinish = async (values) => {
        const { fullName, password, email, phone } = values;
        try {
          const res = await callCreateAUser(fullName, password, email, phone);
          if (res && res.data) {
            message.success('Thêm tài khoản thành công');
            form.resetFields();
            handleOk();
            await fetchUser();
          } else {
            // Kiểm tra và xử lý lỗi từ phản hồi
            if (res && res.data && res.data.message) {
              notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.data.message,
              });
            } else {
              notification.error({
                message: 'Đã có lỗi xảy ra',
                description: 'Không thể tạo tài khoản.',
              });
            }
          }
        } catch (error) {
          // Xử lý lỗi trong trường hợp request không thành công
          notification.error({
            message: 'Đã có lỗi xảy ra',
            description: 'Không thể kết nối tới máy chủ.',
          });
        }
      };
      
    

    return (
        <>

            <Modal title="Tạo mới người dùng" open={isModalOpen} onOk={()=> { form.submit() }} onCancel={handleCancel} okText={'Tạo mới'} cancelText={'Hủy bỏ'}>
            <Divider />
                <Form form = {form} name="basic" labelCol={{ span: 24, }} wrapperCol={{ span: 24, }} initialValues={{ remember: true, }} onFinish={onFinish}  autoComplete="off" >

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
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password />
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
                        <Input />
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
                <Divider />
            </Modal>
        </>
    )
}

export default ModalCreateUser;

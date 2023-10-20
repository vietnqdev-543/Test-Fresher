import { Button, Modal, Checkbox, Form, Input, Divider, message, notification, Col, Row, InputNumber } from 'antd';
import { callCreateABook } from '../../../services/api';

const ModalCreateBook = ({ isModalOpen, handleOk, handleCancel, fetchUser }) => {
    const [form] = Form.useForm()


    const onFinish = async (values) => {
        const { mainText, category, author, price, quantity, sold } = values;
        const res = await callCreateABook(mainText, category, author, price, quantity, sold);
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

    };



    return (
        <>

            <Modal title="Tạo mới sách" width='50%' open={isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel} okText={'Tạo mới'} cancelText={'Hủy bỏ'}>
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24, }}
                    wrapperCol={{ span: 24, }}
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    autoComplete="off" >
                    <Row >
                        <Col span={12}>
                            <Form.Item style={{ marginRight: '10px' }} label="Tên sách" name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên hiển thị!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}  >
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={6} style={{ marginRight: '10px' }}>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá tiền!',
                                    },
                                ]}
                            >
                                <InputNumber addonAfter="VND" />
                            </Form.Item>

                        </Col>

                        <Col span={8} style={{ marginRight: '10px' }}>
                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{ marginRight: '10px' }}>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số lượng sách!',
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{ marginRight: '10px' }}>
                            <Form.Item
                                label="Đã bán"
                                name="sold"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>




                </Form>
                <Divider />
            </Modal>
        </>
    )
}

export default ModalCreateBook;

import React from 'react';
import { Button, Checkbox, Form, Input ,Radio, message, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callPlaceOrder } from '../../services/api';
import { doPlaceOrderAction } from '../../../redux/order/orderSlice';
import { useForm } from 'antd/es/form/Form';


const Payment = ({setCurrentSteps , carts ,totalPrice}) => {
  const { TextArea } = Input;
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    const detailOrder = carts.map(item => {
      return{
        bookName : item.detail.mainText,
        quantity : item.quantity,
        _id : item.id
      }  
    })
    console.log("Detail Order:", detailOrder);
    const data = {
      name : values.name ,
      address : values.address,
      phone : values.phone,
      totalPrice : totalPrice ,
      detail : detailOrder,
      
    }

    const res = await callPlaceOrder(data)
    if(res && res.data){
      message.success('Succesfully')
      dispatch(doPlaceOrderAction())
      setCurrentSteps(2)
    }else{
      notification.error({
        message:'error',
        description: res.message
      })
    }
    

  };
 

  const defaultName = useSelector(state => state.account.user.fullName)
  const defaultPhone = useSelector(state => state.account.user.phone)
  
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'white',
      width: '40%',
      margin: '0 auto'
    }}  >
      <Form
        labelCol={{span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth:600,}}
        onFinish={onFinish}
        form={form}
      
      >
        <Form.Item
          label="Username"
          name="name"
          initialValue={defaultName}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone"
          initialValue={defaultPhone}
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item label="Address" name='address'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Payment Methods">
          <Radio.Group>
            <Radio value="apple"> COD </Radio>
            <Radio value="pear">PayPal </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
        
        >
          <Button type="primary" htmlType="submit" onClick={()=>{form.submit() }} >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Payment;
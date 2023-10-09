
import { Button, Checkbox, Form, Input , message } from 'antd';
import { Link } from 'react-router-dom';
import { callLogin } from '../../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../../redux/account/accountSlice';


const LoginPage = () => {
  const navigate = useNavigate()
  const [isSubmit , setIsSubmit] = useState(false)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    const {username , password} = values ;
    setIsSubmit(true)
    const res = await callLogin(username , password) 
    setIsSubmit(false)
    if(res?.data){
      localStorage.setItem('access_token' , res.data.access_token)
      dispatch(doLoginAction(res.data.user))
      console.log("check res :" , res.data.access_token);
      message.success("Đăng nhập thành công")
      navigate("/")
    }else{
      message.error("Tài khoản hoặc mật khẩu không chính xác")
    }
    console.log('Success:', values);
  };
  return (
    <div className="form-login" style={{marginTop : 80}}>
    
    <Form
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{maxWidth: 500,margin : "0 auto", padding : 20 , boxShadow : "0px 0px 5px 2px rgba(0, 0, 0, 0.2)" , borderRadius : 5}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
     <h1>Login</h1>
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 12,
        }}
      >
        <Button type="primary" htmlType="submit" loading={isSubmit}>
          Submit
        </Button>
      </Form.Item>
      <hr />
      <span>Chưa có tài khoản ? <Link to={"/register"}>Đăng ký</Link>  </span>
    </Form>
  </div>
  )
}
 
  




export default LoginPage;
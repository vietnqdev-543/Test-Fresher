
import { Button, Checkbox, Form, Input ,message } from 'antd';
import "./Register.scss"
import { useNavigate } from 'react-router-dom';
import {callRegister} from "../../services/api"   
import { useState } from 'react';


const Register = () => {
    const navigate = useNavigate()
    const [isSubmit , setIsSubmit] = useState(false)

    const onFinish = async (values) => {
        const {fullName , email ,password , phone} = values ; 
        setIsSubmit(true);
        const res = await callRegister(fullName ,email , password , phone)
        console.log(res.data);
        setIsSubmit(false)
        if(res?.data?._id){
            message.success("Register succesfully")
            navigate("/login")
        }else{
            message.error("Register fail")
        }
        console.log('Success:', values);
    };
    
   return (
    <div className='form-register'>
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
    <h1>Register</h1>
        <Form.Item
            label="Fullname"
            name="fullName"
            rules={[
                {
                    required: true,
                    message: 'Please input your fullname!',
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
            label="Email"
            name="email"
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
            label="Phone"
            name="phone"
            rules={[
                {
                    required: true,
                    message: 'Please input your phone!',
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 0,
                span: 24,
            }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 0,
                span: 24,
            }}
        >
            <Button type="primary" htmlType="submit" loading={isSubmit} >
                Submit
            </Button>
        </Form.Item>
    </Form>
    </div>
   )
};
export default Register;
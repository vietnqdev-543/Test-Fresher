

import { Checkbox, Col, Divider, InputNumber, Row, Popconfirm, message, Empty } from 'antd';
import './Order.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../../redux/order/orderSlice';
import { useEffect, useState } from 'react';
import { LoadingOutlined,  FileDoneOutlined, ShoppingCartOutlined  } from '@ant-design/icons';
import { Steps ,Result ,Button } from 'antd';
import Payment from './Payment';
import Cart from './Cart';

const OrderPage = (props) => {
    const carts = useSelector(state => state.order.carts);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            checkedItems.forEach(itemId => {
                const item = carts.find(cartItem => cartItem._id === itemId);
                if (item) {
                    sum += item.quantity * item.detail.price;
                }
            });
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts, checkedItems]);

    

   
    const [currentSteps, setCurrentSteps] = useState(0);

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <Steps size='small' current={currentSteps} status='finish' style={{ maxWidth: 1440, margin: '0 auto' ,backgroundColor:'white' ,padding:'10px 30px' ,borderRadius:'5px' ,marginBottom:'20px' }}
                items={[
                    {
                        title: 'Order',
                        status: 'finish',
                        icon: <ShoppingCartOutlined/>,
                    },
                    {
                        title: 'Pay',
                        status:'wait' ,
                        icon: <LoadingOutlined />,
                    },
                    {
                        title: 'Done',
                        status: 'wait',
                        icon: <FileDoneOutlined />,
                    },
                ]}
            />

            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
               
                {currentSteps === 0  && <Cart setCurrentSteps={setCurrentSteps} />}
            {currentSteps === 1  && <Payment setCurrentSteps={setCurrentSteps}  carts = {carts} totalPrice={totalPrice}/>}
            {currentSteps === 2  && <Result
                status="success"
                title="Order Successfully !"
                extra={[
                <Button type="primary" >
                    View history
                </Button>,
                ]}
            /> }
               
            </div>
        </div>
    )
}

export default OrderPage;

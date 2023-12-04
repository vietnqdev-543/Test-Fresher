import { useEffect, useState } from 'react';
import {  Col, Divider, InputNumber, Row, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../../redux/order/orderSlice';

const Cart = ({ setCurrentSteps }) => {
  const carts = useSelector((state) => state.order.carts);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      checkedItems.forEach((itemId) => {
        const item = carts.find((cartItem) => cartItem._id === itemId);
        if (item) {
          sum += item.quantity * item.detail.price;
        }
      });
      setTotalPrice(sum);
      console.log('totalprie : ',totalPrice)
    } else {
      setTotalPrice(0);
    }
  }, [carts, checkedItems]);

  

  const handleOnChangeInput = (value, book) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(doUpdateCartAction({ quantity: value, detail: book, _id: book._id }));
      console.log('Checked Items:', checkedItems);
    }
  };

  const submit = () => {
    setCurrentSteps(1);
  };

  return (
    <div style={{ background: '#efefef', padding: '20px 0' }}>
      <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
        <Row gutter={[20, 20]}>
          <Col md={18} xs={24}>
            {carts.map((book, index) => {
              const currentBookPrice = book?.detail?.price ?? 0;
              return (
                <div className="order-book" key={`book-${index}`}>
                  <div className="book-content">
                    <div className="left">
                      <img
                        className="image"
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`}
                        alt=""
                      />
                      <div className="title">{book?.detail?.mainText}</div>
                    </div>

                    <span className="right price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price)}</span>
                  </div>
                  <div className="action">
                    <div className="quantity">
                      <InputNumber onChange={(value) => handleOnChangeInput(value, book)} value={book.quantity} />
                    </div>

                    <div>
                      <span className="sum">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price * book?.quantity)}</span>
                    </div>

                    <DeleteOutlined style={{ color: 'red', fontSize: 18 }} onClick={() => dispatch(doDeleteItemCartAction({ _id: book._id }))} />
                  </div>
                </div>
              );
            })}

            {carts.length === 0 && (
              <div style={{ marginTop: '100px' }}>
                <Empty description={'không có sản phẩm trong giỏ hàng'} />
              </div>
            )}
          </Col>
          <Col md={6} xs={24}>
            <div className="order-sum">
              <div className="calculate">
                <span> Tạm tính</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <div className="calculate">
                <span> Tổng tiền</span>
                <span className="sum-final">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
              </div>
              <Divider style={{ margin: '-5px 0' }} />
              <div className="input-voucher" style={{ width: '100%', height: '60px' }}>
                <input
                  type="text"
                  placeholder="Discount code"
                  style={{ width: '70%', height: '50px', borderRadius: '5px', paddingLeft: '10px', outline: 'none', marginRight: '2%' }}
                />
                <button style={{ width: '28%', height: '50px' }}>Apply</button>
              </div>

              <button onClick={submit}>Mua Hàng {`(${checkedItems.length})`}</button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;

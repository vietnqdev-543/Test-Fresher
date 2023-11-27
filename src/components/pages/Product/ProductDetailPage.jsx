import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Rate, Divider, Button } from 'antd';
import './book.scss';
import ImageGallery from 'react-image-gallery';
import { useRef, useState } from 'react';
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import { callFetchBookById } from '../../services/api';
import BookLoader from './BookLoader';
import { useDispatch } from 'react-redux';
import { doAddBookAction } from '../../../redux/order/orderSlice'

const ProductDetailPage = () => {
    const [dataBook , setDataBook] = useState()
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    let location = useLocation()
    const dispatch = useDispatch()

    let params = new URLSearchParams(location.search);
    const id = params?.get('id')
  

    useEffect(()=>{
        fetchBook(id)
    },[id])

    const fetchBook = async(id) => {
        const res = await callFetchBookById(id)
        if(res && res.data){
            let raw = res.data
            raw.items = getImages(raw)
            
            setTimeout(()=>{
                setDataBook(raw)
            },1000)

        }
    }

    const getImages = (raw) => {
        const images = []
        if(raw.thumbnail){
            images.push(
                {
                    original : `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}` ,
                    thumbnail : `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    originalClass : 'original-image',
                    thumbnailClass : 'thumbnail-images  '
                }
            )
        }

        if(raw.slider){
            raw.slider?.map(item => {
                images.push(
                    {
                        original : `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}` ,
                        thumbnail : `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        originalClass : 'original-image',
                        thumbnailClass : 'thumbnail-images '
                    }
                )
            })
        }
        return images;
    }

    
    

    const refGallery = useRef(null);

    const images = dataBook?.items ?? [];

    const handleOnClickImage = () => {   
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)  
    }

    const [currentQuantity, setCurrentQuantity] = useState(1)

    const handleAddToCart = () => {
        dispatch(doAddBookAction({ quantity: currentQuantity, detail: dataBook, _id: dataBook._id }));
    };
 
  return (
    <div style={{ background: '#efefef', padding: "20px 0" }}>
    <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', height:'auto'}}>
        <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
            {dataBook && dataBook._id ?
                <Row gutter={[20, 20]}>
                <Col md={8} sm={24} xs={24} style={{marginRight:'10%'}}>
                    <ImageGallery
                        ref={refGallery}
                        items={images}
                        showPlayButton={false} //hide play button
                        showFullscreenButton={false} //hide fullscreen button
                        renderLeftNav={() => <></>} //left arrow === <> </>
                        renderRightNav={() => <></>}//right arrow === <> </>
                        slideOnThumbnailOver={true}  //onHover => auto scroll images
                        onClick={() => handleOnClickImage()}
                    />
                </Col>
                <Col md={12} sm={24}>
                    <Col md={24} sm={24} xs={24}>
                        <ImageGallery
                            thumbnailPosition='left'
                            ref={refGallery}
                            items={images}
                            showPlayButton={false} //hide play button
                            showFullscreenButton={false} //hide fullscreen button
                            renderLeftNav={() => <></>} //left arrow === <> </>
                            renderRightNav={() => <></>}//right arrow === <> </>
                            showThumbnails={false}
                        />
                    </Col>
                    <Col span={24}>
                        <div className='author'>Tác giả: <a href='#'>{dataBook.author}</a> </div>
                        <div className='title'> {dataBook.mainText}</div>
                        <div className='rating'>
                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                            <span className='sold'>
                                <Divider type="vertical" />
                                Đã bán {dataBook.sold}</span>
                        </div>
                        <div className="category">
                                <span>Thể loại : {dataBook.category}</span>
                        </div>
                        <div className="quantity">
                                <span>Số lượng còn lại : {dataBook.quantity}</span>
                        </div>
                        <div className='price'>
                            <span className='currency'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook.price)}
                            </span>
                        </div>
                        <div className='delivery'>
                            <div>
                                <span className='left'>Vận chuyển</span>
                                <span className='right'>Miễn phí vận chuyển</span>
                            </div>
                        </div>
                        <div className='quantity'>
                            <span className='left'>Số lượng</span>
                            <span className='right'>
                                <button onClick={() => { setCurrentQuantity(pre => (pre > 1 ? pre - 1 : pre)) }}><MinusOutlined /></button>
                                  <input className='number' value={currentQuantity}/>
                                <button onClick={()=>{setCurrentQuantity(pre => (pre < dataBook.quantity ? pre + 1 : pre) )}}><PlusOutlined /></button>
                            </span>
                        </div>
                        <div className='buy'>
                            <button className='cart' onClick={()=> handleAddToCart(currentQuantity , dataBook)}>
                                <BsCartPlus className='icon-cart' />
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                            <button className='now'>Mua ngay</button>
                        </div>
                    </Col>
                </Col>
            </Row> : <BookLoader />
            }
        </div>
    </div>
    <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
        title={'ali'}
        dataBook={dataBook}
    />
</div>
  )
}

export default ProductDetailPage
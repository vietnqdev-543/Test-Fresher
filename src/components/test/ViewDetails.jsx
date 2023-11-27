import { Row, Col, Rate, Divider, Button } from 'antd';
import './style.scss';
import ImageGallery from 'react-image-gallery';
import { useRef, useState , useEffect } from 'react';
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';


const ViewDetail = (props) => {

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const refGallery = useRef(null);

    const images = [
        {
            original: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSKyAFZK_cEnmfEU76a-b_yR5JUxW9Q8zFwu1SpxIriSbo2d2YaPpDTIQjDecs2WvkTi3lD2xeXmhCgEGrCxBfK79ZrtZD1jDBqgkoJgY-fO7jxg0ponW_w&usqp=CAE',
            thumbnail: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSKyAFZK_cEnmfEU76a-b_yR5JUxW9Q8zFwu1SpxIriSbo2d2YaPpDTIQjDecs2WvkTi3lD2xeXmhCgEGrCxBfK79ZrtZD1jDBqgkoJgY-fO7jxg0ponW_w&usqp=CAE',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqNQL_JD4HeK1IHsB6gA6HgeiLwK-OpW4kOHmz1XjtzJOy29OVnnxaiK-dd2oG64PNWN3qnK-f8QHeD74MJKC-uX0zmDfvu1JMGBvIMGVV&usqp=CAE',
            thumbnail: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqNQL_JD4HeK1IHsB6gA6HgeiLwK-OpW4kOHmz1XjtzJOy29OVnnxaiK-dd2oG64PNWN3qnK-f8QHeD74MJKC-uX0zmDfvu1JMGBvIMGVV&usqp=CAE',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTyemJijNIosKh0xJI5NcVl5GBdGYioMGTUhb5vKnsmp9DZvF7n6vs2ZF9A0wPQTbGTmrpX-LRcdT_7hEJ-N1kbb7eknGGAYTbfZHIxlAEk&usqp=CAE',
            thumbnail: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTyemJijNIosKh0xJI5NcVl5GBdGYioMGTUhb5vKnsmp9DZvF7n6vs2ZF9A0wPQTbGTmrpX-LRcdT_7hEJ-N1kbb7eknGGAYTbfZHIxlAEk&usqp=CAE',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
       
    ];
    const [quantity , setQuantity] = useState(1)

    const handleOnClickImage = () => {    
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }

  

  
    useEffect(() => {
      // Simulate fetching data for 1 second
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
      };
  
      fetchData();
    }, []);

    const [showLoader, setShowLoader] = useState(true);
    useEffect(() => {
        // Sử dụng setTimeout để tắt BookLoader và hiển thị ViewDetail sau khoảng thời gian trễ
        const timer = setTimeout(() => {
          setShowLoader(false);
        }, 1000);
    
        // Dọn dẹp timer khi component unmount
        return () => clearTimeout(timer);
      }, []);

    return (
    
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', height:'auto' }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {showLoader ? (
                        <BookLoader />
                    ): (
                        <Row gutter={[20, 20]}>
                        <Col md={10} sm={0} xs={0}>
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
                        <Col md={14} sm={24}>
                            <Col md={0} sm={24} xs={24}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    showThumbnails={false}
                                />
                            </Col>
                            <Col span={24} style={{paddingLeft:'10%'}}>
                                <h1 className='name'>Miklos Rx</h1>
                                <div className='rating'>
                                    <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                    <span className='sold'>
                                        <Divider type="vertical" />
                                       ( 2 custom reviews )</span>
                                </div>
                                <div className='price'>
                                    <span className='currency'>
                                        <span style={{textDecoration:'line-through' , color:'grey', paddingRight:' 20px'}} className='price-listed'>$200.00 </span>
                                        <span className='price-sale'>$69.00 </span>
                                    </span>
                                </div>
                                <div className="des">
                                    <p style={{lineHeight:2}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat facere aperiam omnis distinctio laudantium sunt necessitatibus perferendis iusto ipsum eligendi asperiores impedit quod nam corrupti magnam animi excepturi, ducimus minima!</p>
                                </div>
                                <div className='delivery'>
                                    <div>
                                        <span className='left'>Shipping </span>
                                        <span className='right'>Free shipping</span>
                                    </div>
                                </div>
                              <div style={{display:'flex' , alignItems:'center'}}>
                                <div className='quantity'>                      
                                            <button onClick={()=>{setQuantity(quantity - 1)  }} ><MinusOutlined /></button>
                                            <input defaultValue={quantity}/>
                                            <button onClick={()=>{setQuantity(quantity + 1) }}><PlusOutlined /></button>
                                    </div>
                                    <div className="addToCart" >
                                        <button className='btn-addCart' style={{display:'flex' ,alignItems:'center'}}>
                                            <span style={{color:'black' ,fontSize:'20px' , padding:'0 10px'}}><BsCartPlus /></span> 
                                            Add To Cart
                                        </button>
                                    </div>
                              </div>
                              <div className="parameter" style={{marginTop:'20px' , lineHeight :'2'}}>
                                <div>
                                    <span className='front'>Lens Type :</span>
                                    <span className='back'>Readers</span>
                                </div>
                                <div>
                                    <span className='front'>Frame Color :</span>
                                    <span className='back'>Black</span>
                                </div>
                                <div>
                                    <span className='front'>Frame Size :</span>
                                    <span className='back'> 50 MM</span>
                                </div>
                              </div>
                               
                            </Col>
                        </Col>
                    </Row>
                    )}
                </div>
               
            </div>
            


          
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={"hardcode"}
            />
        </div>
    )
       
}

export default ViewDetail;

import './style.scss'
import { AiFillGift } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { BiSolidBookAlt } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'antd'
const contentStyle = {
  margin: 0,
  minHeight: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Home = () => {
  const navigate = useNavigate()
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="home-container">
      <div className="banner1">
        <div className="item">
          <h1 className='title'>Embark on a <br /> Journey through Magical Pages</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ut quod earum hic vel expedita odit sit. Quidem officiis porro sed corrupti tenetur mollitia, harum eveniet nesciunt velit pariatur animi ad eaque! Minus, obcaecati qui. Vitae corrupti quasi voluptatum velit?</p>
          <button onClick={() => { navigate('/product') }}>View now !</button>
        </div>
        <div className="item">
          <div className="image">
          </div>
        </div>
      </div>
      {/* <div className="slider" style={{width:'100%' ,height :'auto'}}>
      <Carousel autoplay autoplaySpeed={2000} afterChange={onChange}>
     
        <div>
          <div style={contentStyle}>
            <img style={{width:'100%' ,height:'100%'}} src="https://phunuvietnam.mediacdn.vn/media/news/4d0b954f0bef437c29dfa73fafdf3fa5/tiki.jpg" alt="" />
          </div>
        </div>

        <div>
          <div style={contentStyle}>
            <img style={{width:'100%' ,height:'100%'}} src="https://vanhanhmall.com/wp-content/uploads/2018/04/Rainbow-Book-Fair-Website-banner-01.jpg" alt="" />
          </div>
        </div>

        <div>
          <div style={contentStyle}>
            <img style={{width:'100%' ,height:'100%'}} src="https://img.freepik.com/premium-vector/banner-with-books-concept-education-learning-training-knowledge-information-useful-hobby-love-literature-reading-cartoon-flat-vector-illustration-isolated-pink-background_1002658-557.jpg" alt="" />
          </div>
        </div>
    
    </Carousel>
      </div> */}
      <div className="banner2">
        <div>
          <h1 className="title" style={{ textAlign: 'center' }}>
            THE BOOK GUIDE <span className='primary-color'>ONLINE</span> BOOK STORE
          </h1>
          <p style={{ textAlign: 'center', padding: '10px 15%' }}> Lorem ipsum dolor sit amet, consectetur    adipisicing elit. Voluptatem tempora sequi maiores libero amet eligendi nobis perspiciatis illum in repellat. Vitae numquam, facere sint accusantium cumque necessitatibus. Laborum, odio labore?
          </p>
        </div>

        <div className="box" >
          <div className="box-item">
            <div className="circle"> <span className='icon'><AiFillGift /></span></div>
            <div className="name">Free Gift Wrap</div>
            <div className="des">Free gift wrapping on all purchases. Wrapping includes a blue box with your choice .</div>
            <div className="button"> Read More</div>
          </div>
          <div className="box-item">
            <div className="circle"> <span className='icon'><BiSolidBookAlt /></span></div>
            <div className="name">Buy Selling Used Books</div>
            <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, nostrum.</div>
            <div className="button"> Read More</div>
          </div>
          <div className="box-item">
            <div className="circle"> <span className='icon'><FaShippingFast /></span></div>
            <div className="name">Free Shipping</div>
            <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, nostrum.</div>
            <div className="button"> Read More</div>
          </div>
          <div className="box-item">
            <div className="circle"> <span className='icon'><FaCoins /></span></div>
            <div className="name">Returns & Exchange</div>
            <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, nostrum.</div>
            <div className="button"> Read More</div>
          </div>

        </div>
      </div>

      <div className="banner3">
        <div>
          <h1 className="title" style={{ textAlign: 'center' }}>
            BEST <span className='primary-color'>TOP</span> SELLERS
          </h1>
          <p style={{ textAlign: 'center', padding: '10px 20%' }}> The Book Guide and the Book Library has one of the top sellers books with them. Those books which are sold with in few days and still available in our stock which you can get with us easily.
          </p>
        </div>

        <div className="box" >

          <div className="box-item">
            <div className="thumbnail">
              <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
            </div>
            <div className="author">David Beckham</div>
          </div>
          <div className="box-item">
            <div className="thumbnail">
              <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
            </div>
            <div className="author">David Beckham</div>
          </div>

          <div className="box-item">
            <div className="thumbnail">
              <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
            </div>
            <div className="author">David Beckham</div>

          </div>

          <div className="box-item">
            <div className="thumbnail">
              <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
            </div>
            <div className="author">David Beckham</div>
          </div>


        </div>
      </div>

      <div className="banner4">
        <div className="item">
          <span>3000</span>
          <p>BOOK TO READ</p>
        </div>

        <div className="item">
          <span>7250</span>
          <p>USER</p>
        </div>

        <div className="item">
          <span>1250</span>
          <p>BEST AUTHOR</p>
        </div>

        <div className="item">
          <span>15</span>
          <p>AWARDS</p>
        </div>
      </div>


    </div>
  )
}

export default Home
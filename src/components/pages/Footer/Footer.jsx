import './Footer.scss'
const Footer = () => {
  return (
    <>

      <div className="footer-container">
      <div className="footer-header">
        <h1 className='brand'>READCYCLE</h1>
      </div>
        <div className="footer-content">
          <div className="footer-item">
            <h2 className="title">RESOURCES</h2>
            <div>Application</div>
            <div>Documentation</div>
            <div>Systems</div>
            <div>FAQ</div>
          </div>
          <div className="footer-item">
            <h2 className="title">FRICING</h2>
            <div>Overview</div>
            <div>Premium Plans</div>
            <div>Affilate Program</div>
            <div>Promotions</div>
          </div>
          <div className="footer-item">
            <h2 className="title">COMPANY</h2>
            <div>About Us</div>
            <div>Blog</div>
            <div>PartnerShips</div>
            <div>Careers</div>
            <div>Press</div>
          </div>
          <div className="footer-item">
            <h2 className="title">SOCIAL</h2>
            <div>Facebook</div>
            <div>X</div>
            <div>Instagram</div>
            <div>Youtube</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Footer
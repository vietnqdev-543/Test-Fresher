import "./Header.scss"
const Header = () => {
  return (
    <>
     <div className="header-container">
      <div className="nav-logo">Logo</div>
      <div className="nav-item"><a href="/">Home</a></div>
      <div className="nav-item"><a href="/login">Login</a></div>
      <div className="nav-item"><a href="/register">Register</a></div>
     </div>
    </>
  )
}   



export default Header
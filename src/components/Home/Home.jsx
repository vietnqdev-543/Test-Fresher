import { useSelector } from "react-redux"


const Home = () => {
  const userRole = useSelector(state => state.account.user.role)
  return (
    <div>
      <h1 style={{textAlign : "center"}}>WELCOME TO PAGE</h1>
     {userRole} 
    </div>
  )
}

export default Home
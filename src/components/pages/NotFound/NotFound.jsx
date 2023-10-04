
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate = useNavigate()
    const backHome = ()=> {
        navigate('/')
    }
  return (
    <div> <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={backHome}>Back Home</Button>}
  /></div>
  )
}

export default NotFound
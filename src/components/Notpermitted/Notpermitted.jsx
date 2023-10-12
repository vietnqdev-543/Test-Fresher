
import { Button, Result } from 'antd'
import { useNavigate} from 'react-router-dom'
const Notpermitted = () => {
    const navigate =  useNavigate()
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi , bạn không có quyền truy cập trang này"
                extra={<Button type="primary" onClick={ ()=> navigate('/') }>Back Home</Button>}
            />
        </>
    )
}

export default Notpermitted
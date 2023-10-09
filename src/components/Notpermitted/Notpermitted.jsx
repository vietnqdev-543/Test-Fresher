
import { Button, Result } from 'antd'
import { Navigate } from 'react-router-dom'
const Notpermitted = () => {
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi , bạn không có quyền truy cập trang này"
                extra={<Button type="primary" onClick={ <Navigate to={"/"} />}>Back Home</Button>}
            />
        </>
    )
}

export default Notpermitted
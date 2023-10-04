
import { Button, Result } from 'antd'
import { Navigate } from 'react-router-dom'
const Notpermitted = () => {
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={ <Navigate to={"/"} />}>Back Home</Button>}
            />
        </>
    )
}

export default Notpermitted